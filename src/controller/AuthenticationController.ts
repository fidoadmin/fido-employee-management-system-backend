import { AuthenticationService } from "./../services/AuthenticationService";
import { Logger } from "./../logger/logger";
import { CommonService } from "./../common/common";
import { ErrorMessageModel } from "../models/ErrorMessages";
import bcrypt from "bcrypt";
import { AuthenticationMapper } from "../mapper/AuthenticationMapper";
import { UserLoginInfoModel } from "../models/Userlogininfo";
import { UserModel } from "../models/User";
import EmployeeModel from "../models/Employee";
var moment = require("moment");

const commonService = new CommonService();

export class AuthenticationController {
  async Login(req, res) {
    try {
      const loginBody = req.body;

      const userData = await commonService.GetModelData(EmployeeModel, {
        emailaddress: loginBody.EmailAddress,
      });
      
      if (!userData || userData.deleted !== null) {
        return res.status(400).json({ error: "user not found or deleted" });
      }
      
      
      

      

      if (!userData) {
        const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 4221,});
        return  res.status(404).json({ error: result?.errormessage || "Email Address not found" });
      }


      
      const match = await bcrypt.compare(loginBody.Password, userData.password);
      
      if (match) {
        const authenticationMapper = new AuthenticationMapper();
        const mappedLogin = authenticationMapper.ModelToDTO( userData, loginBody.Source );

        const authenticationService = new AuthenticationService();
        const loginData = await authenticationService.UpsertLogin(mappedLogin);

        const results = authenticationMapper.LoginResponse(loginData, userData);
        return res.status(200).json(results);
      }

       else {
        const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 412,});
        return res.status(401) .json({ error: result?.errormessage || "Incorrect Password" });
      }

    } catch (err) {
      await new Logger().Error("Login",err.toString(),req.userId,req.clientId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500, });
      return res.status(500).json({ error: result?.errormessage || "Internal Server Error" });
    }
  }

  async Logout(req, res) {
    try {

      const authKey = req.headers.authkey;
      
      const updateResult = await commonService.UpdateModelData( UserLoginInfoModel,{ guid: authKey },
        {
          loggedout: moment().format("YYYY-MM-DD HH:mm:ss"),
          deleted: moment().format("YYYY-MM-DD HH:mm:ss"),
        } );

      if (updateResult === 0) {
        const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 404,});
        return res.status(404).json({ error: result?.errormessage || "Not Found" });
      }

      return res.status(204).send(""); 
    } catch (err) {
      await new Logger().Error("Logout",err.toString(),req.userId,req.clientId );
      const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 500,
      });
      res.status(500).json({ error: result?.errormessage || "Internal Server Error" });
    }
  }
}
