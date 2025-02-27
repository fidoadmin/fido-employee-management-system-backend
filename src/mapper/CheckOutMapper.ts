export class CheckoutMapper {
  ModelToDto(data: any[]) {
    const mappedData = data.map((checkout) => {
      const mappedCheckout = {
        CheckoutNumber: checkout.checkoutnumber ? checkout.checkoutnumber : "",
        CheckoutStartedBy: checkout.checkoutstartedby
          ? checkout.checkoutstartedby
          : null,
        CheckoutCompletedBy: checkout.checkoutcompletedby
          ? checkout.checkoutcompletedby
          : null,
        Status: checkout.statusname ? checkout.statusname : null,
        StatusCode: checkout.statuscode ? checkout.statuscode : null,
        CheckoutType: checkout.checkouttypename
          ? checkout.checkouttypename
          : null,
        CheckoutTypeCode: checkout.checkouttypecode
          ? checkout.checkouttypecode
          : null,
        Created: checkout.created ? checkout.created : null,
        Modified: checkout.modified ? checkout.modified : null,
      };
      return mappedCheckout;
    });
    return mappedData;
  }

  // async checkoutDetailsModelToDTO(checkoutDetails, checkoutInventoryDetails) {

  //     const groupedDetails = await this.ToAndForDetails(checkoutDetails);
  //     const mappedCheckedInventoryDetails =  await this.CheckoutListModelToDto(checkoutInventoryDetails);

  //     mappedCheckedInventoryDetails.forEach(item => {
  //         delete item.ModelNumber;
  //         delete item.ShortName;
  //         delete item.ManufactuereName;
  //         delete item.CheckoutNumber;
  //         item.SelectedInventories.forEach(inventory => {
  //             delete inventory.Barcode;
  //             delete inventory.Location;
  //             delete inventory.PackSize;
  //         });
  //         delete item.HoldQuantity;
  //         delete item.Isfulfilled;
  //     });

  //     const finalMappedDetails = Object.keys(groupedDetails).map(checkoutNumber => {
  //         return {
  //             ...groupedDetails[checkoutNumber],
  //             SelectedInventories: mappedCheckedInventoryDetails
  //         };
  //     });

  //     return finalMappedDetails;
  // }

    async checkoutDetailsModelToDTO(checkoutDetails, checkoutInventoryDetails,isForGatePass) {
        const groupedDetails = await this.ToAndForDetails(checkoutDetails,isForGatePass);
        const mappedCheckedInventoryDetails = await this.CheckoutListModelToDto(checkoutInventoryDetails);
    
        mappedCheckedInventoryDetails.forEach(item => {
            delete item.ModelName;
            delete item.PartNumber;
            delete item.ManufactuereName;
            delete item.CheckoutNumber;
            delete item.HoldQuantity;
            delete item.Isfulfilled;
            let totalQuantity = 0;
            item.SelectedInventories.forEach(inventory => {
                delete inventory.Barcode;
                delete inventory.Location;
                if (inventory.Quantity) {
                    totalQuantity += inventory.Quantity;
                }
            });
            item.Quantity = totalQuantity;
        });
        
        const finalMappedDetails = {
            ...groupedDetails,
            SelectedInventories: mappedCheckedInventoryDetails
        };
    
        return finalMappedDetails;
    }
    
    
    DtoToModel(checkout: any) {
        const mappedCheckout = {
            guid: checkout.Id ? checkout.Id : null,
            checkoutstartedby: checkout.CheckoutStartedBy ? checkout.CheckoutStartedBy : null,
            checkoutcompletedby: checkout.CheckoutCompletedBy ? checkout.CheckoutCompletedBy : null,
            buyerid: checkout.BuyerId ? checkout.BuyerId : null,
            statusid: checkout.StatusId ? checkout.StatusId : null,
            created: checkout.Created ? checkout.Created : null,
            modified: checkout.Modified ? checkout.Modified : null,
            deleted: checkout.Deleted ? checkout.Deleted : null
        };
        return mappedCheckout;
    }

  // ToAndForDetails(checkoutDetails) {
  //     const groupedDetails = {};

  //     checkoutDetails.forEach(detail => {

  //         if (!groupedDetails[detail.checkoutnumber]) {
  //             groupedDetails[detail.checkoutnumber] = {
  //                 CheckoutNumber: detail.checkoutnumber,
  //                 CheckoutType: detail.checkouttype,
  //                 StatusCode: detail.statuscode,
  //                 UpdatedDate: detail.dateupdated,
  //                 BranchDetails: null,
  //                 CompanyDetails: null
  //             };
  //         }

  //         const isBranchDetailsPresent = detail.frombranch || detail.tobranch;
  //         const isCompanyDetailsPresent = detail.companyfrom || detail.companyto;

  //         if (isBranchDetailsPresent) {
  //             if (!groupedDetails[detail.checkoutnumber].BranchDetails) {
  //                 groupedDetails[detail.checkoutnumber].BranchDetails = [];
  //             }
  //             groupedDetails[detail.checkoutnumber].BranchDetails.push({
  //                 ChallanNumber: detail.challannumber,
  //                 BranchFrom: detail.frombranch,
  //                 BranchFromAddress: detail.frombranchaddress,
  //                 BranchFromPhoneNumber: detail.frombranchphonenumber,
  //                 BranchFromId: detail.frombranchguid,
  //                 BranchTo: detail.tobranch,
  //                 BranchToAddress: detail.tobranchaddress,
  //                 BranchToPhoneNumber: detail.tobranchphonenumber,
  //                 BranchToId: detail.tobranchguid,
  //             });
  //         }

  //         if (isCompanyDetailsPresent) {
  //             if (!groupedDetails[detail.checkoutnumber].CompanyDetails) {
  //                 groupedDetails[detail.checkoutnumber].CompanyDetails = [];
  //             }
  //             groupedDetails[detail.checkoutnumber].CompanyDetails.push({
  //                 ChallanNumber: detail.challannumber,
  //                 CompanyFrom: detail.companyfrom,
  //                 CompanyTo: detail.companyto,
  //                 CompanyFromAddress: detail.companyfromaddress,
  //                 CompanyToAddress: detail.companytoaddress,
  //                 CompanyFromPhoneNumber: detail.companyfromphonenumber,
  //                 CompanyToPhoneNumber: detail.companytophonenumber,
  //                 CompanyFromId: detail.companyfromguid,
  //                 CompanyToId: detail.companytoguid
  //             });
  //         }
  //     });

  //     return groupedDetails;
  // }
  ToAndForDetails(checkoutDetails, isForGatePass) {
    const groupedDetails = {};
  
    checkoutDetails.forEach((detail) => {
      if (!groupedDetails[detail.checkoutnumber]) {
        groupedDetails[detail.checkoutnumber] = {
          CheckoutNumber: detail.checkoutnumber,
          CheckoutType: detail.checkouttype,
          StatusCode: detail.statuscode,
          HasFoc: detail.hasfoc,
          HasSale:detail.hassale,
          Remarks: detail.remarks,
          PurchaseOrderNumber: detail.purchaseordernumber,
          UpdatedDate: detail.dateupdated,
          BranchDetails: [],
          CompanyDetails: [],
        };
      }
  
      const isBranchDetailsPresent = detail.frombranch || detail.tobranch;
      if (isBranchDetailsPresent) {
        groupedDetails[detail.checkoutnumber].BranchDetails.push({
          SaleChallanNumber: detail.salechallannumber,
          FocChallanNumber: detail.focchallannumber,
          BranchFrom: detail.frombranch,
          BranchTo: detail.tobranch,
          BranchFromAddress: detail.frombranchaddress,
          BranchToAddress: detail.tobranchaddress,
          BranchFromPhoneNumber: detail.frombranchphonenumber,
          BranchToPhoneNumber: detail.tobranchphonenumber,
          BranchFromId: detail.frombranchguid,
          BranchToId: detail.tobranchguid,
        });
      }
  
      // Handle CompanyDetails
      const isCompanyDetailsPresent = detail.companyfrom || detail.companyto;
      if (isCompanyDetailsPresent) {
        const companyDetail = {
          ChallanNumber: detail.challannumber,
          SaleChallanNumber: detail.salechallannumber,
          FocChallanNumber: detail.focchallannumber,
          CompanyFrom: detail.companyfrom,
          CompanyFromPanNumber: detail.companyfrompannumber,
          CompanyToPanNumber: detail.companytopannumber,
          CompanyTo: detail.companyto,
          CompanyFromAddress: detail.companyfromaddress,
          CompanyToAddress: detail.companytoaddress,
          CompanyFromPhoneNumber: detail.companyfromphonenumber,
          CompanyToPhoneNumber: detail.companytophonenumber,
          CompanyFromId: detail.companyfromguid,
          CompanyToId: detail.companytoguid,
        };
  
        if (isForGatePass == 'true') {
          groupedDetails[detail.checkoutnumber].CompanyDetails = [companyDetail]; 
        } else {
          groupedDetails[detail.checkoutnumber].CompanyDetails.push(companyDetail);
        }
      }
    });
  
    const checkoutNumbers = Object.keys(groupedDetails);
    if (checkoutNumbers.length > 0) {
      return groupedDetails[checkoutNumbers[0]];
    }
    return {};
  }
  

  CheckoutListDtoToModel(params) {
    const mappedDescriptionDetails = params.descriptionDetails.map((item) => ({
      descriptionguid: item.DescriptionId,
      quantity: item.Quantity ? item.Quantity : 0,
      focquantity: item.FocQuantity ? item.FocQuantity : 0,
      isfoc: item.IsFoc ? item.IsFoc :0,
      isopenbox: item.IsOpenBox,
      specificexpirydate: item.SpecificExpiryDate ? item.SpecificExpiryDate : null,
      isprecheckinrequest: item.IsPrecheckInRequest ? item.IsPrecheckInRequest : null,
    }));

    const mappedInternalCheckoutFlow = params.internalcheckoutflow
      ? params.internalcheckoutflow.map((item) => ({
          companyguid: item.CompanyId,
        }))
      : null;

    const mappedData = {
      buyerguid: params.buyerId,
      branchguid: params.branchId,
      checkoutbranchguid: params.checkoutBranchId,
      checkoutcompanyguid: params.checkoutCompanyId,
      ids: mappedDescriptionDetails,
      remarks: params.remarks,
      purchaseordernumber: params.purchaseOrderNumber,
      userid: params.userid,
      checkoutnumber: params.checkoutnumber,
      checkoutflow: mappedInternalCheckoutFlow,
    };

    return mappedData;
  }

  CheckoutListModelToDto(data: any[]) {
    const mappedData = data.map((item) => {
      const totalQuantity = item.selectedinventories
        ? item.selectedinventories.reduce(
            (sum, inventory) =>
              sum + (inventory.quantity ? inventory.quantity : 0),
            0
          )
        : 0;
      return {
        CheckoutNumber: item.returncheckoutnumber
          ? item.returncheckoutnumber
          : null,
        Description: item.resultdescription ? item.resultdescription : null,
        ModelName: item.modelname ? item.modelname : null,
        PartNumber: item.partnumber ? item.partnumber : null,
        ShortName: item.shortname ? item.shortname : null,
        StatusCode: item.statuscode ? item.statuscode : null,
        CheckoutTypeName: item.checkouttypename ? item.checkouttypename : null,
        ManufactuereName: item.manufacturername ? item.manufacturername : null,
        Quantity: totalQuantity,
        SelectedInventories: item.selectedinventories
          ? item.selectedinventories.map((inventory: any) => ({
              InventoryId: inventory.inventoryguid
                ? inventory.inventoryguid
                : null,
              ExpiryDate: inventory.expirationdate
                ? inventory.expirationdate
                : null,
              BatchNumber: inventory.batchnumber ? inventory.batchnumber : null,
              ContainerType: inventory.containertype
                ? inventory.containertype
                : null,
              PackSize: inventory.packsize ? inventory.packsize : null,
              Barcode: inventory.barcode ? inventory.barcode : null,
              Quantity: inventory.quantity ? inventory.quantity : null,
              Location: inventory.shelf ? inventory.shelf : null,
            }))
          : [],
        Isfulfilled: item.fulfilled ? item.fulfilled : false,
        HoldQuantity: item.holdquantity,
      };
    });
    return mappedData;
  }
}
