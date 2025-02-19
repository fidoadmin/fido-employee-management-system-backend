import { CompanyHolidayMapper } from './../mapper/CompanyHolidayMapper';
import { Logger } from "../logger/logger";
import { ErrorMessageModel } from "../models/ErrorMessages";
import { CommonService } from "../common/common";
import { CompanyHolidayService } from "../services/CompanyHolidayService";

const commonService = new CommonService();

export class CompanyHolidayController {

  async GetCompanyHoliday(req, res) {
    try {
      const page = req.query.Page || 1;
      const limit = req.query.Limit || 10;
      const pageOffset = (page - 1) * limit;
      const pageLimit = limit;

      const varparams = {
        pageOffset,
        pagelimit: pageLimit,
        sortBy: req.query.varsortby || "name",
        sortOrder: req.query.varsortorder || "asc",
        search: req.query.varsearch || "",
      };

      const companyHolidayService = new CompanyHolidayService();
      const companyHoliday = await companyHolidayService.GetCompanyHoliday(varparams);

      const totalCount = companyHoliday.length > 0 ? companyHoliday[0].total : 0;

      res.header("X-Page-TotalCount", totalCount.toString());

      const companyHolidayMapper = new CompanyHolidayMapper();
      const mappedClient = companyHolidayMapper.ModelToDto(companyHoliday);

      return res.status(200).json(mappedClient);

    } catch (err) {
      await new Logger().Error("Get Company Holiday", err.toString(), req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
      return res.status(500).json(result.errormessage);
    }
  }

  async UpsertCompanyHoliday(req, res): Promise<void> {
    try {
      const companyHolidayData = req.body;

      const companyHolidayMapper = new CompanyHolidayMapper();
      const mappedCompanyHoliday = companyHolidayMapper.DtoToModel(companyHolidayData);

      const companyHolidayService = new CompanyHolidayService();
      const result = await companyHolidayService.UpsertCompanyHoliday(mappedCompanyHoliday);

      return res.status(200).json(result);

    } catch (err) {
      await new Logger().Error("Upsert Company Holiday", err.toString(), req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
      return res.status(500).json(result.errormessage);
    }
  }

  async DeleteCompanyHoliday(req, res) {
    try {
      const companyHolidayId = req.params.Id;
      const isGuid: boolean = await commonService.isUUID(req.params.Id);

      if (!isGuid) {
        const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 404 });
        return res.status(404).json(result.errormessage);
      }

      const companyHolidayService = new CompanyHolidayService();
      const result = await companyHolidayService.DeleteCompanyHoliday(companyHolidayId);

      return res.status(200).json(result);

    } catch (err) {
      await new Logger().Error("Delete Company Holiday", err.toString(), req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
      return res.status(500).json(result.errormessage);
    }
  }
}
