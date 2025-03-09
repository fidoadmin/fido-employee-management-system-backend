import { CompanyService } from "./../services/CompanyServices";
import { CompanyMapper } from "../mapper/CompanyMapper";
import { Logger } from "../logger/logger";
import { ErrorMessageModel } from "../models/ErrorMessages";
import { CommonService } from "../common/common";
const commonService = new CommonService();

export class CompanyController {
  async GetCompanies(req, res) {
    try {
      const page = req.query.Page ? req.query.Page : 1;
      const limit = req.query.Limit ? req.query.Limit : 10;
      const pageOffset = (page - 1) * limit;
      const pageLimit = limit;
      const varparams: any = {
        pageOffset,
        pagelimit: pageLimit,
        sortBy: req.query.varsortby ? req.query.varsortby : "name",
        sortOrder: req.query.varsortorder ? req.query.varsortorder : "asc",
        search: req.query.varsearch ? req.query.varsearch : "",
      };

      const companyService = new CompanyService();
      const companies = await companyService.GetCompanies(varparams);

      const totalCount = companies.length > 0 ? companies[0].total : 0;
      res.header("X-Page-TotalCount", totalCount.toString());

      const companyMapper = new CompanyMapper();
      const mappedCompany = companyMapper.ModelToDto(companies);

      return res.status(200).json(mappedCompany);
    } catch (err) {
      await new Logger().Error("Get Company ", err.toString(), req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
      return res.status(500).json(result.errormessage);
    }
  }

  async UpsertCompany(req, res) {
    try {
      const companyData = req.body;
      const isNumeric = (value) => /^\d+$/.test(value); 


     if (companyData.Pan) {
     if (typeof companyData.Pan !== "string" || !isNumeric(companyData.Pan) || (companyData.Pan.length !== 9 && companyData.Pan.length !== 10)) {
       const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4242 });
       return res.status(400).json({ error: result.errormessage });}
      }

     if (companyData.LandlineNumber) {
        if (typeof companyData.LandlineNumber !== "string" || !isNumeric(companyData.LandlineNumber) || (companyData.LandlineNumber.length !== 9 && companyData.LandlineNumber.length !== 10)) {
        const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4243 });
        return res.status(400).json({ error: result.errormessage });
       }
      }

      if (companyData.MobileNumber) {
        if (typeof companyData.MobileNumber !== "string" || !isNumeric(companyData.MobileNumber) || companyData.MobileNumber.length !== 10) {
          const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4244 });
          return res.status(400).json({ error: result.errormessage });
        }
      }

     if (!companyData.Name || companyData.Name.trim() === "") {
       const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4250 });
       return res.status(400).json({ error: result.errormessage });
     }
     
     if (!companyData.EmailAddress || companyData.EmailAddress.trim() === "") {
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4251 });
      return res.status(400).json({ error: result.errormessage });
     }


     if (!companyData.Id && (!companyData.Code || companyData.Code.trim() === "")) {
       const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4252 });
       return res.status(400).json({ error: result.errormessage });  
      }

     

      const companyMapper = new CompanyMapper();
      const mappedCompany = companyMapper.DtoToModel(companyData);

      const companyService = new CompanyService();
      const result = await companyService.UpsertCompany(mappedCompany);

      if (result[0].result == "Duplicate code") {
        const result = await commonService.GetModelData(ErrorMessageModel, {
          statuscode: 4092,
        });
        return res.status(409).json({ error: result.errormessage });
      }

      return res.status(200).json(result);
    } catch (err) {
     await new Logger().Error("Upsert Company ", err.toString(), req.clientId, req.userId);
     const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
     return res.status(500).json(result.errormessage);
    }
  }

  async DeleteCompany(req, res): Promise<void> {
    try {
      const companyGUID = req.params.Id;

      const isGuid: boolean = await commonService.isUUID(companyGUID);

      if (!isGuid) {
        const result = await commonService.GetModelData(ErrorMessageModel, {
          statuscode: 404,
        });
        return res.status(404).json({ error: result.errormessage });
      }

      const companyService = new CompanyService();
      const result = await companyService.DeleteCompany(companyGUID);

      if (result[0].result == "Already in use") {
        const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 4233,});
        return res.status(409).json( {error:result.errormessage});
      }

      return res.status(200).json(result);
    } catch (err) {
     await new Logger().Error("Delete Company ", err.toString(), req.clientId, req.userId);
     const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
     return res.status(500).json(result.errormessage);
    }
  }
}
