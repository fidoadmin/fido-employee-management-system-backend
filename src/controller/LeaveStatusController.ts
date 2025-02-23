import { Logger } from "../logger/logger";
import { ErrorMessageModel } from "../models/ErrorMessages";
import { CommonService } from "../common/common";

import { LeaveStatusService } from "../services/LeaveStatusService";
import { LeaveStatusMapper } from "../mapper/LeaveStatusMapper";
const commonService = new CommonService();

export class LeaveStatusController {
  async GetLeaveStatus(req, res) {
    try {
      const leaveService = new LeaveStatusService();
      const leaves = await leaveService.GetLeaveStatus();

      const leaveStatusMapper = new LeaveStatusMapper();
      const mappedleave = leaveStatusMapper.ModelToDto(leaves);

      return res.status(200).json(mappedleave);
    } catch (error) {
      new Logger().Error("List Leave",error.toString(),req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
      res.status(500).json(result.errormessage)
    }
  }

}
