import { ClientMapper } from "./../mapper/ClientMapper";
import { ClientService } from "../services/ClientServices";
import { Logger } from "../logger/logger";
import { ErrorMessageModel } from "../models/ErrorMessages";
import { CommonService } from "../common/common";
import { LeaveTypeService } from "../services/LeaveTypeService";
import { LeaveTypeMapper } from "../mapper/LeaveTypeMapper";
const commonService = new CommonService();

export class LeaveTypeController {
  async GetLeaveTypes(req, res) {
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

      const leaveTypeService = new LeaveTypeService();
      const clients = await leaveTypeService.GetLeaveTypes(varparams);

      const totalCount = clients.length > 0 ? clients[0].total : 0;
      res.header("X-Page-TotalCount", totalCount.toString());

      const leaveTypeMapper = new LeaveTypeMapper();
      const mappedLeaveType = leaveTypeMapper.ModelToDto(clients);

      return res.status(200).json(mappedLeaveType);
    } catch (error) {
      new Logger().Error("List LeaveType",error.toString(),req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
      res.status(500).json(result.errormessage)
     }
  }

  async UpsertLeaveType(req, res) {
    try {
      const leaveTypeData = req.body;

      const leaveTypeMapper = new LeaveTypeMapper();
      const mappedLeaveType = leaveTypeMapper.DtoToModel(leaveTypeData);

      const leaveTypeService = new LeaveTypeService();
      const result = await leaveTypeService.UpsertLeaveType(mappedLeaveType);

      if (result[0].result == "Duplicate code") {
        const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4092, });
        return res.status(409).json({ error: result.errormessage });
      }

      return res.status(200).json(result);
    }catch (error) {
      new Logger().Error("Upsersert Leave Type",error.toString(),req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
      res.status(500).json(result.errormessage)
     }
  }

  async DeleteLeaveType(req, res) {
    try {
      const leaveTypeId = req.params.Id;
      const isGuid: boolean = await commonService.isUUID(leaveTypeId);

      if (!isGuid) {
        const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 404,});
        return res.status(404).json(result.errormessage);
      }

      const leaveTypeService = new LeaveTypeService();
      const result = await leaveTypeService.DeleteLeaveType(leaveTypeId);

      return res.status(200).json();
    } catch (error) {
      new Logger().Error("Delete Leave type",error.toString(),req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
      res.status(500).json(result.errormessage)
     }
      }
}
