import { CheckoutService } from "../services/CheckOutService";
import { Logger } from "../logger/logger";
import { CheckoutMapper } from "../mapper/CheckOutMapper";
import { CommonService } from "../common/common";
import { ErrorMessageModel } from "../models/ErrorMessages";
import { CheckoutModel } from "../models/Checkout";
import { StatusModel } from "../models/Status";
import config from "../config";
import moment from "moment";

const commonService = new CommonService();
export class CheckoutController {
  async GenerateCheckOutList(req, res) {
    try {
      const descriptionDetails = req.body.DescriptionDetails
        ? req.body.DescriptionDetails
        : [];
      const buyerId = req.body.BuyerId ? req.body.BuyerId : null;
      const branchId = req.body.BranchId ? req.body.BranchId : null;
      const checkoutNumber = commonService.generateRandomNumber(1, 100000);
      const checkoutRelay = req.body.CheckoutRelay
        ? req.body.CheckoutRelay
        : null;
      const checkoutBranchId = req.body.CheckoutBranchId
        ? req.body.CheckoutBranchId
        : null;
      const checkoutCompanyId = req.body.CheckoutCompanyId
        ? req.body.CheckoutCompanyId
        : null;
      const purchaseOrderNumber = req.body.PoNumber ? req.body.PoNumber : null;
      const remarks = req.body.Remarks ? req.body.Remarks : null;

      const varparams = {
        descriptionDetails,
        buyerId,
        branchId,
        checkoutBranchId,
        checkoutCompanyId,
        userid: req.userId,
        remarks,
        purchaseOrderNumber,
        checkoutnumber: checkoutNumber,
        internalcheckoutflow: checkoutRelay,
      };

      const checkoutMapper = new CheckoutMapper();
      const mappedCheckouts = checkoutMapper.CheckoutListDtoToModel(varparams);

      const checkoutService = new CheckoutService();
      const results = await checkoutService.GenerateCheckoutlist(
        mappedCheckouts
      );

      if (results[0].result == "Not Found") {
        const result = await commonService.GetModelData(ErrorMessageModel, {
          statuscode: 4042,
        });
        res.status(404).json({ error: result.errormessage });
        return;
      }

      // const mappedData = checkoutMapper.CheckoutListModelToDto(results);

      // const emailTemplate = await commonService.GetModelData(EmailTemplateModel,{templatecode:'EmailTemplate-CheckoutList',deleted:null});

      // if (!emailTemplate) {
      //     const errorMessage = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
      //     res.status(500).json({ error: errorMessage.errormessage });
      //     return;
      // };

      // const userData = await commonService.GetModelData(UserModel,{id:req.userId?req.userId:2});

      // const emailSubject = emailTemplate.subject
      //     .replace('{first name}', userData.firstname)
      //     .replace('{last name}', userData.lastname);

      // const emailBody = emailTemplate.body
      //     .replace('{firstname}', userData.firstname)
      //     .replace('{resetLink}', config.dev_url + 'checkoutlist/' + mappedData[0].CheckoutId);

      // const emailSender = new EmailSender();
      // const mailResult = await emailSender.send(emailSubject, emailBody, userData.emailaddress);

      res.status(200).json({ result: results[0].result });
    } catch (err) {
      await new Logger().Error(
        "GenerateCheckOutList",
        err.toString(),
        req.userId,
        req.clientId
      );
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });
      res.status(500).json({ error: result.errormessage });
    }
  }

  async GetCheckouts(req, res) {
    try {
      const page = req.query.Page ? req.query.Page : 1;
      const limit = req.query.Limit ? req.query.Limit : 0;
      const isFromReport = req.query.IsFromReport? req.query.IsFromReport:false;
      const onlyCancelled = req.query.OnlyCancelled? req.query.OnlyCancelled: false;
      const onlyDispatched = req.query.OnlyDispatched? req.query.OnlyDispatched:false;
      const fromDate =  req.query.FromDate?req.query.FromDate:null;
      const toDate = req.query.ToDate?req.query.ToDate:null;

      const pageOffSet = (page - 1) * limit;
      const pageLimit = limit;
      const varparams = {
        pageoffset: pageOffSet,
        pagelimit: pageLimit,
        search: req.query.Search ? req.query.Search : "",
        sortby: req.query.SortBy ? req.query.SortBy : "created",
        sortorder: req.query.SortOrder ? req.query.SortOrder : "DESC",
        statusguid: req.query.StatusId ? req.query.StatusId : null,
        isfromreport: isFromReport,
        onlycancelled: onlyCancelled,
        onlydispatched: onlyDispatched,
        fromdate:fromDate,
        todate:toDate
      };

      const checkoutService = new CheckoutService();
      const results = await checkoutService.LoadCheckouts(varparams);
      res.header(
        "X-Page-TotalCount",
        results.length > 0 ? results[0].total : 0
      );

      const checkoutMapper = new CheckoutMapper();
      const mappedCheckouts = checkoutMapper.ModelToDto(results);

      res.status(200).json(mappedCheckouts);
    } catch (err) {
      await new Logger().Error("GetCheckouts", err.toString(), req.userId,req.clientId);
      const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 500});
      res.status(500).json({ error: result.errormessage });
    }
  }

  async DeleteCheckout(req, res) {
    try {
      const checkoutId = req.params.Id;

      const isGuid = await commonService.isUUID(checkoutId);
      if (!isGuid) {
        const result = await commonService.GetModelData(ErrorMessageModel, {
          statuscode: 422,
        });
        res.status(422).json({ error: result.errormessage });
        return;
      }

      const checkoutService = new CheckoutService();
      await checkoutService.DeleteCheckout(checkoutId);

      res.status(200).json();
    } catch (err) {
      new Logger().Error("DeleteCheckout", err.toString(), req.userId,req.clientId);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });
      res.status(500).json({ error: result.errormessage });
    }
  }

  async GetCheckoutList(req, res) {
    try {
      const checkOutNumber = req.params.CheckoutNumber;

      const checkoutService = new CheckoutService();
      const checkoutData = await checkoutService.GetCheckoutlist(
        checkOutNumber
      );
      if (checkoutData.length <= 0) {
        const result = await commonService.GetModelData(ErrorMessageModel, {
          statuscode: 404,
        });
        res.status(404).json({ error: result.errormessage });
        return;
      }

      const checkoutMapper = new CheckoutMapper();
      const mappedData = checkoutMapper.CheckoutListModelToDto(checkoutData);
      res.status(200).json(mappedData);
    } catch (err) {
      new Logger().Error("GetCheckout", err.toString(), req.userId,req.clientId);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });
      res.status(500).json({ error: result.errormessage });
    }
  }

  async VerifyCheckout(req, res) {
    try {
      const checkoutNumber = req.params.CheckoutNumber;

      const varParams = {
        checkoutnumber: checkoutNumber,
        userid: req.userId,
      };

      const checkoutService = new CheckoutService();
      const results = await checkoutService.VerifyCheckout(varParams);

      if (results.length <= 0) {
        const result = await commonService.GetModelData(ErrorMessageModel, {
          statuscode: 404,
        });
        res.status(404).json({ error: result.errormessage });
        return;
      }

      res.status(200).json(results[0].result);
    } catch (err) {
      new Logger().Error("VerifyCheckout", err.toString(), req.userId,req.clientId);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });
      res.status(500).json({ error: result.errormessage });
    }
  }

  async CancelCheckout(req, res) {
    try {
      const checkoutNumber = req.params.CheckoutNumber;

      const varParams = {
        checkoutnumber: checkoutNumber,
        userid: req.userId,
      };

      const checkoutService = new CheckoutService();
      const results = await checkoutService.CancelCheckout(varParams);
      if (results.length <= 0) {
        const result = await commonService.GetModelData(ErrorMessageModel, {
          statuscode: 404,
        });
        res.status(404).json({ error: result.errormessage });
        return;
      }

      res.status(200).json(results[0].result);
    } catch (err) {
      new Logger().Error("CancelCheckout", err.toString(), req.userId,req.clientId);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });
      res.status(500).json({ error: result.errormessage });
    }
  }

  async SendBranchTrasnferMail(req, res) {
    try {
      const checkoutNumber = req.params.checkoutnumber;

      const checkoutService = new CheckoutService();
      const statusDetails = await commonService.GetModelData(StatusModel, {
        code: "CheckOutStatus-IncompleteBranchTransfer",
        deleted: null,
      });
      const updateResult = await commonService.UpdateModelData(
        CheckoutModel,
        { checkoutnumber: checkoutNumber, deleted: null },
        { checkouttypeid: statusDetails.id, modified: moment.now() }
      );
      const linkToSend =
        config.dev_url + "verifybranchtransfercheckoutlist/" + checkoutNumber;
      res.status(200).json(linkToSend);
    } catch (err) {
      new Logger().Error("SendBranchTrasnferMail", err.toString(), req.userId,req.clientId);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });
      res.status(500).json({ error: result.errormessage });
    }
  }

  async UpdateCheckoutInventoryQuantity(req, res) {
    try {
      const checkOutNumber = req.body.checkoutNumber;
      const inventoryId = req.body.InventoryId;
      const quantity = req.body.Quantity;

      const varparams = {
        checkoutnumber: checkOutNumber,
        inventoryguid: inventoryId,
        quantity: quantity,
      };

      const checkoutService = new CheckoutService();
      const checkoutData =
        await checkoutService.UpdateCheckoutInventoryQuantity(varparams);
      if (checkoutData.length <= 0) {
        const result = await commonService.GetModelData(ErrorMessageModel, {
          statuscode: 404,
        });
        res.status(404).json({ error: result.errormessage });
        return;
      }

      res.send(200);
    } catch (err) {
      new Logger().Error(
        "UpdateCheckoutInventoryQuantity",
        err.toString(),
        req.userId,
        req.clientId
      );
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });
      res.status(500).json({ error: result.errormessage });
    }
  }

  async GetCheckoutDetails(req, res) {
    try {
      const checkOutNumber = req.params.CheckoutNumber;
      const isForSaleChallan = req.query.IsForSaleChallan;

      const isForGatePass = req.query.IsForGatePass;

      const checkoutService = new CheckoutService();
      const checkoutDetails = await checkoutService.LoadCheckoutDetails(
        checkOutNumber
      );

      if (checkoutDetails.length <= 0) {
        const result = await commonService.GetModelData(ErrorMessageModel, {
          statuscode: 404,
        });
        res.status(404).json({ error: result.errormessage });
        return;
      }

      const varparams = {
        checkoutnumber: checkOutNumber,
        isforsalechallan: isForSaleChallan,
      };

      if (isForGatePass == "true") {
        var checkoutInventoryDetails = await checkoutService.GetCheckoutlist(
          checkOutNumber
        );
      } else {
        var checkoutInventoryDetails =
          await checkoutService.GetCheckoutlistForChanllan(varparams);
      }

      const checkoutMapper = new CheckoutMapper();
      const mappedCheckoutDetails: any =
        await checkoutMapper.checkoutDetailsModelToDTO(
          checkoutDetails,
          checkoutInventoryDetails,
          isForGatePass
        );

      if (
        !mappedCheckoutDetails.CompanyDetails &&
        !mappedCheckoutDetails.BranchDetails
      ) {
        const result = await commonService.GetModelData(ErrorMessageModel, {
          statuscode: 4041,
        });
        res.status(404).json({ error: result.errormessage });
        return;
      }

      res.status(200).json(mappedCheckoutDetails);
    } catch (err) {
      new Logger().Error("GetCheckoutDetails", err.toString(), req.userId,req.clientId);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });
      res.status(500).json({ error: result.errormessage });
    }
  }

  async GetToAndForDetails(req, res) {
    try {
      const checkOutNumber = req.params.CheckoutNumber;
      const checkoutService = new CheckoutService();
      const checkoutData = await checkoutService.LoadCheckoutDetails(
        checkOutNumber
      );
      if (checkoutData.length <= 0) {
        const result = await commonService.GetModelData(ErrorMessageModel, {
          statuscode: 404,
        });
        res.status(404).json({ error: result.errormessage });
        return;
      }
      const checkoutMapper = new CheckoutMapper();
      const mappedData = checkoutMapper.ToAndForDetails(checkoutData,false);
      res.status(200).json(mappedData);
    } catch (err) {
      new Logger().Error("GetCheckout", err.toString(), req.userId,req.clientId);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });
      res.status(500).json({ error: result.errormessage });
    }
  }
}
