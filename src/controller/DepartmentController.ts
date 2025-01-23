import { ErrorMessageModel } from "./../models/ErrorMessages";
import { DepartmentMapper } from "./../mapper/DepartmentMapper";
import { DepartmentService } from "../services/DepartmentServices";
import { Logger } from "../logger/logger";
import { CommonService } from "../common/common";
const commonService = new CommonService();

export class DepartmentController {
  async GetDepartments(req, res) {
    
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
      const departmentService = new DepartmentService();
      const departments = await departmentService.GetDepartments(varparams);
      const totalCount = departments.length > 0 ? departments[0].total : 0;
      res.header("X-Page-TotalCount", totalCount.toString());
      if (departments.length === 0) {
        res.status(404).json({ message: "No departments found" });
        return;
      }
      const departmentMapper = new DepartmentMapper();
      const mappedDepartments = departmentMapper.ModelToDto(departments);
      res.status(200).json(mappedDepartments);
    } catch (err) {
      await new Logger().Error("GetDepartments", err.toString(), 1, 1);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });

      res.status(500).json({ error: result.errormessage });
    }
  }
  async UpsertDepartment(req, res) {
    try {
      const departmentData = req.body;
      const departmentService = new DepartmentService();
      const departmentMapper = new DepartmentMapper();
      const mappedDepartment = departmentMapper.DtoToModel(departmentData);
      const result = await departmentService.UpsertDepartment(mappedDepartment);

      // if (result[0].result == "Code duplicate") {
      //   const result = await commonService.GetModelData(ErrorMessageModel, {
      //     statuscode: 409,
      //   });
      //   res.status(409).json({ error: result.errormessage });
      //   return;
      // }
      res.status(200).json({ Id: result });
    } catch (err) {
      new Logger().Error("Upsersert Department", err.toString(), 1, 2);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });
      res.status(500).json({ error: result.errormessage });
    }
  }
  async DeleteDepartment(req, res) {
    try {
      const departmentID = req.params.id;
      const isGuid: boolean = await commonService.isUUID(departmentID);
      if (!isGuid) {
        const result = await commonService.GetModelData(ErrorMessageModel, {
          statuscode: 500,
        });
        console.log(result)
        res.status(500).json({ error: result.errormessage });
      }
      const departmentService = new DepartmentService();
      const result = await departmentService.DeleteDepartment(departmentID);
      res.status(200).json(result);
    } catch (err) {
      new Logger().Error("DeleteDepartment", err.toString(), 1, 1);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });
      res.status(500).json({ error: result.errormessage });
    }
  }
}
