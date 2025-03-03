import { ErrorMessageModel } from "./../models/ErrorMessages";
import { Logger } from "../logger/logger";
import { CommonService } from "../common/common";
import { EmployeeService } from "../services/EmployeeService";
import { EmployeeMapper } from "../mapper/EmployeeMapper";
import config from "../config";
import EmployeeModel from "../models/Employee";
const commonService = new CommonService();
const bcrypt = require("bcrypt");

export class EmployeeController {
  async GetEmployees(req, res) {
    
    try {
      const page = req.query.Page ? req.query.Page : 1;
      const limit = req.query.Limit ? req.query.Limit : 10;
      const pageOffset = (page - 1) * limit;
      const pageLimit = limit;
      const varparams: any = {
        pageOffset,
        pagelimit: pageLimit,
        sortBy: req.query.varsortby ? req.query.varsortby : "firstname",
        sortOrder: req.query.varsortorder ? req.query.varsortorder : "asc",
        search: req.query.varsearch ? req.query.varsearch : "",
      };

      const employeeService = new EmployeeService();
      const employees = await employeeService.GetEmployees(varparams);

      const totalCount = employees.length > 0 ? employees[0].total : 0;
      res.header("X-Page-TotalCount", totalCount.toString());
  
      const employeeMapper = new EmployeeMapper();
      const mappedEmployee = employeeMapper.ModelToDto(employees);

      return res.status(200).json(mappedEmployee);
    }  catch (error) {
      new Logger().Error(" Employee",error.toString(),req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
      return res.status(500).json(result.errormessage)
    }
  }

  async UpsertEmployee(req, res) {
    try {

      
      const employeeData = req.body;


      if(employeeData.Password){

        const saltRounds = Number(config.saltKey);
        
        const hashedPassword = await bcrypt.hash(employeeData.Password, saltRounds);
        employeeData.Password = hashedPassword;
      }


      const employeeMapper = new EmployeeMapper();
      const mappedEmployee = employeeMapper.DtoToModel(employeeData);

      const employeeService = new EmployeeService();
      const result = await employeeService.UpsertEmployee(mappedEmployee);

     if (result[0].result == "Duplicate Email") {
       const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 409,});
        return res.status(409).json( {error:result.errormessage});
      }
         
      return res.status(200).json(result);
    } catch (error) {
     new Logger().Error("Upsersert Employee",error.toString(),req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
      return res.status(500).json(result.errormessage) 
    }
  }

  async ChangePassword(req, res) {
    try {
      const passwordData = req.body;
      const employeeService = new EmployeeService();
  
      const userData = await commonService.GetModelData(EmployeeModel, { Id: passwordData.Id });
  
      if (!userData || userData.length === 0) {
        return res.status(404).json({ error: "Employee Not Found" });
      }
  
      const currentPasswordHash = userData[0].password;
  
      const isPasswordCorrect = await bcrypt.compare(passwordData.CurrentPassword, currentPasswordHash);
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Incorrect Password" });
      }
  
      const isSamePassword = await bcrypt.compare(passwordData.ChangePassword, currentPasswordHash);
      if (isSamePassword) {
        return res.status(400).json({ error: "Cannot use the old password." });
      }
  
      const saltRounds = Number(config.saltKey);
      const hashedPassword = await bcrypt.hash(passwordData.ChangePassword, saltRounds);
  
      const updateData = {
        id: userData[0].id, 
        password: hashedPassword
      };
  
      const employeeMapper = new EmployeeMapper();
      const mappedEmployee = employeeMapper.DtoToModel(updateData);
      
      const result = await employeeService.ChangePasswordRequest(mappedEmployee);
  
      return res.status(200).json({ message: "Password updated successfully." });
  
    } catch (error) {
      new Logger().Error("Change Password", error.toString(), req.clientId, req.userId);
      const errorResponse = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
      return res.status(500).json({ error: errorResponse.errormessage });
    }
  }
  


  async DeleteEmployee(req, res) {
    try {
      const employeeId = req.params.Id;
      const isGuid: boolean = await commonService.isUUID(employeeId);

      if (!isGuid) {
        const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 404,});
        return res.status(404).json(  result.errormessage );
      }

      const employeeService = new EmployeeService();
      const result = await employeeService.DeleteEmployee(employeeId);

      return res.status(200).json();

    }catch (error) {
     new Logger().Error("Delete Employee",error.toString(),req.clientId, req.userId);
     const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
     return res.status(500).json(result.errormessage) 
    }
  }
}
