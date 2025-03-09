import { RoleService } from "./../services/RoleServices";
import { RoleMapper } from "../mapper/RoleMapper";

import { Logger } from "../logger/logger";
import { ErrorMessageModel } from "../models/ErrorMessages";
import { CommonService } from "../common/common";
import { UserProfileService } from "../services/UserProfileService";
import { UserMapper } from "../mapper/UserMapper";
const commonService = new CommonService();
export class UserProfileController {
  async GetUserProfile(req, res) {
    try {
      const userGuid = req.query.employeeId
      if (!userGuid) {
          return res.status(400).json({ message: "Missing required parameter: guid" });
       }
   
      const userProfileService = new UserProfileService();
      const userprofile = await userProfileService.GetUserProfile(userGuid);


      const userProfileMapper = new UserMapper();
      const mappedProfile = userProfileMapper.ModelToDto(userprofile);

      return res.status(200).json(mappedProfile);

    }catch (err) {
      await new Logger().Error("Get Roles", err.toString(), req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 500,});
      return res.status(500).json( result.errormessage );
     }
  }
}