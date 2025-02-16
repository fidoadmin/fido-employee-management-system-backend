import { ErrorMessageModel } from "./../models/ErrorMessages";
import { DepartmentMapper } from "./../mapper/DepartmentMapper";
import { Logger } from "../logger/logger";
import { CommonService } from "../common/common";
import { EmployeeService } from "../services/EmployeeService";
import { EmployeeMapper } from "../mapper/EmployeeMapper";
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
      const departments = await employeeService.GetEmployees(varparams);
      const totalCount = departments.length > 0 ? departments[0].total : 0;
      res.header("X-Page-TotalCount", totalCount.toString());
  
      const departmentMapper = new EmployeeMapper();
      const mappedDepartments = departmentMapper.ModelToDto(departments);

      return res.status(200).json(mappedDepartments);
    }  catch (error) {
       new Logger().Error(" Employee",error.toString(),req.clientId, req.userId);
       const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
       return res.status(500).json(result.errormessage)
         }
  }


  async UpsertEmployee(req, res) {
    try {
      const saltRounds =10;
      const departmentData = req.body;
      
   if(departmentData.password){
     departmentData.password = await bcrypt.hash(departmentData.password,saltRounds)
     }

      const departmentService = new EmployeeService();
    //   const departmentMapper = new DepartmentMapper();
    //   const mappedDepartment = departmentMapper.DtoToModel(departmentData);
      const result = await departmentService.UpsertEmployee(departmentData);



    if (result[0].result == "Duplicate Email") {
       const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 409,});
     return res.status(409).json( {error:result.errormessage});
      }
         
    return res.status(200).json(result);
    }     catch (error) {
          new Logger().Error("Upsersert Employee",error.toString(),req.clientId, req.userId);
          const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
          return res.status(500).json(result.errormessage) 
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

      const departmentService = new EmployeeService();
      const result = await departmentService.DeleteEmployee(employeeId);

      return res.status(200).json();
    }   catch (error) {
        new Logger().Error("Delete Department",error.toString(),req.clientId, req.userId);
        const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
         return res.status(500).json(result.errormessage) 
        }
  }
}
