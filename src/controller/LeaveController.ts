import { Logger } from "../logger/logger";
import { ErrorMessageModel } from "../models/ErrorMessages";
import { CommonService } from "../common/common";
import { LeaveTypeService } from "../services/LeaveTypeService";
import { LeaveService } from "../services/LeaveService";
import { LeaveMapper } from "../mapper/LeaveMapper";
const commonService = new CommonService();

export class LeaveController {
  async GetLeaves(req, res) {
    try {
      const page = req.query.Page ? req.query.Page : 1;
      const limit = req.query.Limit ? req.query.Limit : 10;
      const pageOffset = (page - 1) * limit;
      const pageLimit = limit;
      const statusguids = req.query.statusguids
      const varparams: any = {
        pageOffset,
        pagelimit: pageLimit,
        sortBy: req.query.varsortby ? req.query.varsortby : "created",
        sortOrder: req.query.varsortorder ? req.query.varsortorder : "asc",
        search: req.query.varsearch ? req.query.varsearch : "",
        statusguids:statusguids
      };

      const leaveService = new LeaveService();
      const leaves = await leaveService.GetLeaves(varparams);

      const totalCount = leaves.length > 0 ? leaves[0].total : 0;
      res.header("X-Page-TotalCount", totalCount.toString());

      const leaveMapper = new LeaveMapper();
      const mappedleave = leaveMapper.ModelToDto(leaves);

      return res.status(200).json(mappedleave);
    } catch (error) {
      new Logger().Error("List Leave",error.toString(),req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
      res.status(500).json(result.errormessage)
    }
  }

  async UpsertLeave(req, res) {
    try {
      const leaveData = req.body;

      const leaveMapper = new LeaveMapper();
      const mappedLeave = leaveMapper.DtoToModel(leaveData);

      const leaveService = new LeaveService();
      const result = await leaveService.UpsertLeave(mappedLeave);

      return res.status(200).json(result);
    }catch (error) {
      new Logger().Error("Upsersert Leave ",error.toString(),req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
      res.status(500).json(result.errormessage)
    }
  }

  async DeleteLeave(req, res) {
    try {
      const leaveId = req.params.Id;

      const isGuid: boolean = await commonService.isUUID(leaveId);

      if (!isGuid) {
        const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 404,});
        return res.status(404).json(result.errormessage);
      }

      const leaveTypeService = new LeaveTypeService();
      const result = await leaveTypeService.DeleteLeaveType(leaveId);

      return res.status(200).json();
    } catch (error) {
      new Logger().Error("Delete Leave ",error.toString(),req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
      res.status(500).json(result.errormessage)
    }
  }
}
