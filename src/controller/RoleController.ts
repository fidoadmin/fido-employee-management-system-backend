import { RoleService } from "./../services/RoleServices";
import { RoleMapper } from "../mapper/RoleMapper";
import { Request, Response } from "express";
import { PositionMapper } from "../mapper/PositionMapper";
import { Logger } from "../logger/logger";
import { ErrorMessageModel } from "../models/ErrorMessages";
import { CommonService } from "../common/common";
const commonService = new CommonService();
export class RoleController {
  static GetRole: any;

  async GetRoles(req, res) {
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

      const roleService = new RoleService();
      const roles = await roleService.GetRoles(varparams);

      const totalCount = roles.length > 0 ? roles[0].total : 0;
      res.header("X-Page-TotalCount", totalCount.toString());

      if (roles.length === 0) {
        res.status(404).json({ Message: "No Positionos" });
      }
      const roleMapper = new RoleMapper();
      const mappedroles = roleMapper.ModelToDto(roles);
      res.status(200).json(mappedroles);
    } catch (err) {
      await new Logger().Error("GetDepartments", err.toString(), 1, 1);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });

      res.status(500).json({ error: result.errormessage });
    }
  }

  async UpsertRole(req: Request, res: Response): Promise<void> {
    try {
      const roleData = req.body;
      const roleService = new RoleService();
      const roleMapper = new RoleMapper();
      const mappedRole = roleMapper.DtoToModel(roleData);
      const result = await roleService.UpsertRole(mappedRole);

      res.status(200).json({ Id: result });
    } catch (err) {
      new Logger().Error("Upsersert Department", err.toString(), 1, 2);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });
      res.status(500).json({ error: result.errormessage });
    }
  }

  async DeleteRole(req, res) {
    try {
      const roleId = req.params.id;

      const isGuid: boolean = await commonService.isUUID(roleId);
      if (!isGuid) {
        const result = await commonService.GetModelData(ErrorMessageModel, {
          statuscode: 500,
        });
        console.log(result);
        res.status(500).json({ error: result.errormessage });
      }
      const roleService = new RoleService();
      const result = await roleService.DeleteRole(roleId);
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
