import { DepartmentMapper } from "./../mapper/DepartmentMapper";
import { DepartmentService } from "../services/DepartmentServices";

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
        sortOrder: req.query.varsortorder ? req.query.varsortorder : "ASC",
        search: req.query.varsearch ? req.query.varsearch : "",
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
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async DeleteDepartment(req, res) {
    try {
      const departmentID = req.params.id;
      console.log(departmentID);
      const departmentService = new DepartmentService();

      const result = await departmentService.DeleteDepartment(departmentID);
      if (result) {
        res.status(200).json({ message: "Department deleted successfully" });
      } else {
        res.status(404).json({ message: "Department not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  //  GET DEPARTMENT
  async GetDepartment(req, res) {
    try {
      const departmentID = req.params.id;
      if (!departmentID || departmentID.trim() === "") {
        res.status(400).json({ message: "Id is required" });
        return;
      }
      console.log("Received Id:", departmentID);

      const departmentService = new DepartmentService();
      const departmentData = await departmentService.GetDepartment(
        departmentID
      );
      if (!departmentData || departmentData.length === 0) {
        res.status(404).json({ message: "Department not found" });
        return;
      }
      const departmentMapper = new DepartmentMapper();
      const mappedDepartment = departmentMapper.ModelToDto(departmentData);

      res.status(200).json(mappedDepartment);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async UpsertDepartment(req, res) {
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
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
