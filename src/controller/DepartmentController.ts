import { DepartmentMapper } from "./../mapper/DepartmentMapper";
import { Request, Response } from "express";
import { DepartmentService } from "../services/DepartmentServices";

export class DepartmentController {
  async GetDepartments(req: Request, res: Response): Promise<void> {
    try {
      const page = req.query.Page ? parseInt(req.query.Page as string, 10) : 1;
      const limit = req.query.Limit
        ? parseInt(req.query.Limit as string, 10)
        : 10;
      const companyId = req.query.CompanyId || null;
      const isEntryPoint = req.query.IsEntryPoint === "true" ? true : null;
      const pageOffset = (page - 1) * limit;

      const varparams: any = {
        pageOffset,
        pageLimit: limit,
        sortBy: req.query.varsortby?.toString() || "name",
        sortOrder: req.query.varsortorder?.toString().toUpperCase() || "ASC",
        companyGuid: companyId,
        isEntryPoint,
        search: req.query.varsearch?.toString() || "",
      };

      const departmentService = new DepartmentService();
      const departments = await departmentService.GetAllDepartments(varparams);

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
      console.error("Error in GetDepartments:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async DeleteDepartment(req: Request, res: Response): Promise<void> {
    try {
      const departmentGUID = req.params.guid;
      console.log(departmentGUID);
      const departmentService = new DepartmentService();

      const result = await departmentService.DeleteDepartment(departmentGUID);
      if (result) {
        res.status(200).json({ message: "Department deleted successfully" });
      } else {
        res.status(404).json({ message: "Department not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  //  GET DEPARTMENT
  async GetDepartment(req: Request, res: Response): Promise<void> {
    try {
      console.log("Request Params:", req.params.guid);
      const departmentGUID = req.params.guid;
      console.log("GUID:", departmentGUID);
      if (!departmentGUID || departmentGUID.trim() === "") {
        res.status(400).json({ message: "GUID is required" });
        return;
      }
      console.log("Received GUID:", departmentGUID);

      const departmentService = new DepartmentService();
      const departmentData = await departmentService.GetDepartment(
        departmentGUID
      );
      if (!departmentData || departmentData.length === 0) {
        res.status(404).json({ message: "Department not found" });
        return;
      }
      const departmentMapper = new DepartmentMapper();
      const mappedDepartment = departmentMapper.ModelToDto(departmentData);

      res.status(200).json(mappedDepartment);
    } catch (err) {
      console.error("Error fetching department:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async UpsertDepartment(req: Request, res: Response): Promise<void> {
    try {
      const departmentData = req.body;
      console.log(departmentData);

      // Validate if the required fields are present
      if (!departmentData.Name) {
        res.status(422).json({ error: "Name is required" });
        return;
      }
      const departmentService = new DepartmentService();
      const departmentMapper = new DepartmentMapper();
      const mappedDepartment = departmentMapper.DtoToModel(departmentData);

      const result = await departmentService.UpsertDepartment(mappedDepartment);

      if (result.error) {
        res.status(400).json(result);
      } else {
        res.status(200).json(result);
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
