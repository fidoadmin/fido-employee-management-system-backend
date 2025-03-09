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

     const isNumeric = (value) => /^\d+$/.test(value); 

     if (employeeData.Pan) {
     if (typeof employeeData.Pan !== "string" || !isNumeric(employeeData.Pan) || (employeeData.Pan.length !== 9 && employeeData.Pan.length !== 10)) {
       const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4242 });
       return res.status(400).json({ error: result.errormessage });}
      }

     if (employeeData.LandlineNumber) {
        if (typeof employeeData.LandlineNumber !== "string" || !isNumeric(employeeData.LandlineNumber) || (employeeData.LandlineNumber.length !== 9 && employeeData.LandlineNumber.length !== 10)) {
        const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4243 });
        return res.status(400).json({ error: result.errormessage });
       }
      }

      if (employeeData.MobileNumber) {
        if (typeof employeeData.MobileNumber !== "string" || !isNumeric(employeeData.MobileNumber) || employeeData.MobileNumber.length !== 10) {
          const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4244 });
          return res.status(400).json({ error: result.errormessage });
        }
      }

      if ((!employeeData.FirstName && !employeeData.LastName) || (employeeData.FirstName && employeeData.FirstName.trim() === "")) {
       const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4250 });
       return res.status(400).json({ error: result.errormessage });
      }
     
 
      if (!employeeData.EmailAddress || employeeData.EmailAddress.trim() === "") {
        const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4251 });
        return res.status(400).json({ error: result.errormessage });
      }
       
     if (!employeeData.Id && (!employeeData.Password || employeeData.Password.trim() === "")) {
       const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4253 });
       return res.status(400).json({ error: result.errormessage });  
      }
            


      
      //  if (!employeeData.ClientId || employeeData.ClientId.trim() === "") {
      //   const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4254 });
      //   return res.status(400).json({ error: result.errormessage });
      // }


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
      const { Id, CurrentPassword, ChangePassword } = req.body;
  
      const employeeService = new EmployeeService();
      const userData = await commonService.GetModelData(EmployeeModel, { guid: Id });
  
      const employee = userData; 
      const currentPasswordHash = employee.password;
  
      const isPasswordCorrect = await bcrypt.compare(CurrentPassword, currentPasswordHash);
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Incorrect Password" });
      }
  
      const isSamePassword = await bcrypt.compare(ChangePassword, currentPasswordHash);
      if (isSamePassword) {
        return res.status(400).json({ error: "Cannot use the old password." });
      }
  
      const saltRounds = config.saltKey ? Number(config.saltKey) : 10; 
      const hashedPassword = await bcrypt.hash(ChangePassword, saltRounds);
  
      const updateData = {
        Id: employee.guid,  
        ChangePassword: hashedPassword, 
      };
  
      const employeeMapper = new EmployeeMapper();
      const mappedEmployee = employeeMapper.ModelPassword(updateData);
  
      const result = await employeeService.ChangePasswordRequest(mappedEmployee);
  
      return res.status(200).json(result);
  
    } catch (error) {
      new Logger().Error("Change Password", error.toString(), req.clientId, req.userId);
      const errorResponse = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
      return res.status(500).json({ error: errorResponse?.[0]?.errormessage || "Internal Server Error" });
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
