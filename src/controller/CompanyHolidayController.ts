import { CompanyHolidayMapper } from './../mapper/CompanyHolidayMapper';
import { ClientMapper } from "./../mapper/ClientMapper";
import { ClientService } from "../services/ClientServices";
import { Logger } from "../logger/logger";
import { ErrorMessageModel } from "../models/ErrorMessages";
import { CommonService } from "../common/common";
import { CalenderService } from "../services/CalenderService";
import { CompanyHolidayService } from "../services/CompanyHolidayService";
const commonService = new CommonService();

export class CompanyHolidayController {
        async GetCompanyHoliday(req, res) {
      
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
      
            const companyHolidayService = new CompanyHolidayService();
            const companyHoliday = await companyHolidayService.GetCompanyHoliday(varparams);
      
            const totalCount = companyHoliday.length > 0 ? companyHoliday[0].total :0;
            res.header("X-Page-TotalCount", totalCount.toString());
            
            const companyHolidayMapper = new CompanyHolidayMapper();
            const mappedClient = companyHolidayMapper.ModelToDto(companyHoliday);
      
            return res.status(200).json(mappedClient);
            
          } catch (err) {
            await new Logger().Error("GetDepartments", err.toString(), req.clientId, req.userId);
            const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 500,});
            return res.status(500).json( result.errormessage );
          }
          }
  
         async UpsertCompanyHoliday(req, res): Promise<void> {
         try {
         const companyHolidayData = req.body;
    
         if (!companyHolidayData) {
            return res.status(400).json({ error: "Request body is required" });
          }
  
       const companyHolidayMapper = new CompanyHolidayMapper();
       const mappedCompanyHoliday = companyHolidayMapper.DtoToModel(companyHolidayData);
  
       const calanderService = new CompanyHolidayService();
       const result = await calanderService.UpsertCompanyHoliday(mappedCompanyHoliday);
  
       return res.status(200).json(result);
         }catch (err) {
            await new Logger().Error("GetDepartments", err.toString(), req.clientId, req.userId);
            const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 500,});
            return res.status(500).json( result.errormessage );
          }
  }
  

  
  
  
      async DeleteCompanyHoliday(req, res) {
      try {
         const companyHolidayId = req.params.Id;
           const isGuid: boolean = await commonService.isUUID(req.params.Id);

          if (!isGuid) {
          const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 404,});
          res.status(404).json( result.errormessage );
            }

          const companyHolidayService = new CompanyHolidayService();
          const result = await companyHolidayService.DeleteCompanyHoliday(companyHolidayId);
         return res.status(200).json(result);

        } catch (err) {
          await new Logger().Error("GetDepartments", err.toString(), req.clientId, req.userId);
          const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 500,});
          return res.status(500).json( result.errormessage );
        }
  }



}
