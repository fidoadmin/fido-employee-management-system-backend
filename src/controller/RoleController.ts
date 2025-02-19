import { RoleService } from "./../services/RoleServices";
import { RoleMapper } from "../mapper/RoleMapper";

import { Logger } from "../logger/logger";
import { ErrorMessageModel } from "../models/ErrorMessages";
import { CommonService } from "../common/common";
const commonService = new CommonService();
export class RoleController {
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

      const roleMapper = new RoleMapper();
      const mappedroles = roleMapper.ModelToDto(roles);

      return res.status(200).json(mappedroles);

    }catch (err) {
      await new Logger().Error("Get Roles", err.toString(), req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 500,});
      return res.status(500).json( result.errormessage );
     }
  }

  async UpsertRole(req,res): Promise<void> {
    try {
      const roleData = req.body;
      
      const roleMapper = new RoleMapper();
      const mappedRole = roleMapper.DtoToModel(roleData);
      
      const roleService = new RoleService();
      const result = await roleService.UpsertRole(mappedRole);
      
      if (result[0].result == "Duplicate code") {
        const result = await commonService.GetModelData(ErrorMessageModel, {    statuscode: 4092,});
       return res.status(409).json( {error:result.errormessage});    
      }

     return res.status(200).json(result);
    }  
    catch (err) {
      await new Logger().Error("Upsert Role", err.toString(), req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 500,});
      return res.status(500).json( result.errormessage );
    }
  }

  async DeleteRole(req, res) {
   try {
      const roleId = req.params.id;
      const isGuid: boolean = await commonService.isUUID(roleId);

      if (!isGuid) {
        const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 404,});
       res.status(404).json( result.errormessage );
      }

      const roleService = new RoleService();
      const result = await roleService.DeleteRole(roleId);

      return res.status(200).json();

    } 
    catch (err) {
      await new Logger().Error("Delete Role", err.toString(), req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 500,});
      return res.status(500).json( result.errormessage );
    }
  }
}
