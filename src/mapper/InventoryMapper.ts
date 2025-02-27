export class InventoryMapper {
    ModelToDto(results) {
        const mappedData = results.map((result) => {
            const mapped = {
                Id: result.guid,
                Description: result.description ? result.description : null,
                ShortName: result.shortname  ? result.shortname  : null,
                PartNumber:result.partnumber ? result.partnumber :null,
                BatchNumber:result.batchnumber ? result.batchnumber :null,
                ExpirationDate : result.expirationdate  ? result.expirationdate : null,
                Quantity: result.stock ? result.stock : null,
            };
            return mapped;
        });
        return mappedData;
    }

    InventoriesPerCompanyMapper(results) {
        const mappedData = results.map((result) => {
            const mapped = {
                BranchId: result.branchguid,
                AvailableQuantity: result.availablequantity ? result.availablequantity : 0,
                BranchName: result.branchname  ? result.branchname  : null
            };
            return mapped;
        });
        return mappedData;
    }

    DtoToModel(result: any) {
        const mappedInventory = {
            Id: result.guid ? result.guid : null,
            AgentId: result.agentid ? result.agentid : null,
            AgentName: result.agentname ? result.agentname : null,
            BarCode: result.barcode ? result.barcode : null,
            BatchNumber: result.batchnumber ? result.batchnumber : null,
            BranchId: result.branchid ? result.branchid : null,
            BranchName: result.branchname ? result.branchname : null,
            CategoryId: result.categoryid ? result.categoryid : null,
            CategoryName: result.categoryname ? result.categoryname : null,
            IsExpirationDate: result.isexpirationdate ? result.isexpirationdate : false,
            CompanyId: result.companyid ? result.companyid : null,
            CompanyName: result.companyname ? result.companyname : null,
            ContainerId: result.containerid ? result.containerid : null,
            ContainerType: result.containertype ? result.containertype : null,
            Created: result.created ? result.created : null,
            Description: result.description ? result.description : null,
            ExpirationDate: result.expirationdate ? result.expirationdate : null,
            HSCode: result.hscode ? result.hscode : null,
            InventoryDescriptionId: result.inventorydescriptionid ? result.inventorydescriptionid : null,
            LastEditBy: result.firstname + " " + result.lastname ? result.firstname + " " + result.lastname : null,
            ManufactureDate: result.manufacturedate ? result.manufacturedate : null,
            ModelNumber: result.modelnumber ? result.modelnumber : null,
            Modified: result.modified ? result.modified : null,
            ProformaInvoiceNumber: result.pinumber ? result.pinumber : null,
            PackSize: result.packsize  ? result.packsize  : null,
            PartNumber: result.partnumber ? result.partnumber : null,
            Quantity: result.stock ? result.stock : null,
            Remarks: result.remarks ? result.remarks : null,
            SerialNumber: result.serialnumber ? result.serialnumber : null,
            Shelf: result.shelf ? result.shelf : null,
            ShortName: result.shortname ? result.shortname : null,
            StatusName: result.statusname ? result.statusname : null,
            SupplierId: result.supplierid ? result.supplierid : null,
            SupplierName: result.suppliername ? result.suppliername : null,
            ManufacturerId : result.manufacturerid  ? result.manufacturerid  : null,
            ManufacturerName : result.manufacturername  ? result.manufacturername  : null,
            SubInventories :result.subinventories,
            PurchaseOrderNumber : result.purchaseordernumber ? result.purchaseordernumber:null,
            PurchaseInvoiceNumber : result.purchaseinvoicenumber ? result.purchaseinvoicenumber:null,
            InvoiceNumber : result.invoicenumber ? result.invoicenumber:null

        };
        return mappedInventory;
    }

    DTOModel(results: any, userId: string) {
        const mapped = {
            guid: results.Id ? results.Id:null,
            agentid: results.AgentId ? results.AgentId : null,
            barcode: results.BarCode ? results.BarCode : null,
            batchnumber: results.BatchNumber ? results.BatchNumber : null,
            branchid: results.BranchId ? results.BranchId : null,
            categoryid: results.CategoryId ? results.CategoryId : null,
            companyid: results.CompanyId ? results.CompanyId : null,
            containerid : results.ContainerId ? results.ContainerId : null,
            expirationdate: results.ExpirationDate ? results.ExpirationDate : null,
            hscode: results.HSCode ? results.HSCode : null,
            manufacturedate: results.ManufactureDate ? results.ManufactureDate : null,
            manufacturerid: results.ManufacturerId ? results.ManufacturerId : null,
            modelnumber: results.ModelNumber ? results.ModelNumber : null,
            partnumber: results.PartNumber ? results.PartNumber : null,
            remarks: results.Remarks ? results.Remarks : null,
            shelf: results.Shelf ? results.Shelf : null,
            serialnumber : results.SerialNumber ? results.SerialNumber : null,
            stock: results.Quantity ? results.Quantity : 0,
            supplierid: results.SupplierId ? results.SupplierId : null,
            userid: userId,
            inventorydescriptionid: results.InventoryDescriptionId ?results.InventoryDescriptionId :null,
            pinumber: results.ProformaInvoiceNumber  ?results.ProformaInvoiceNumber  :null ,
            purchaseordernumber : results.PurchaseOrderNumber ? results.PurchaseOrderNumber:null,
            purchaseinvoicenumber : results.PurchaseInvoiceNumber ? results.PurchaseInvoiceNumber:null,
            invoicenumber : results.InvoiceNumber ? results.InvoiceNumber:null

        };
        return mapped;
    }

    // ModelToDtoList(results: any[]) {
    //     const mappedData = results.map((inventory.) => {
    //         const mapped = {
    //             //CurrentInventory: inventory.currentinventory,
    //             CategoryInventory:inventory.categoryinventory
    //         };
    //         return mapped;
    //     });
    //     return mappedData;
    // }
}

