import { Logger } from "./../logger/logger";
import { CommonService } from './../common/common';
import { ErrorMessageModel } from '../models/ErrorMessages';
import { RoleService } from "../services/RoleService";
import { RoleMapper } from "../mapper/RoleMapper";
import { validate } from 'uuid';
const commonService = new CommonService();

export class RoleController {

    async GetRoles(req, res) {
        try {
            const page = req.query.Page ? parseInt(req.query.Page) : 0;
            const limit = req.query.Limit?parseInt(req.query.Limit):0;
            const pageoffset = (page - 1) * limit;
            const pagelimit = limit;
            const varparams = {
                pageoffset: pageoffset,
                pagelimit: pagelimit,
                search: req.query.Search ? req.query.Search : '',
                sortby: req.query.SortBy ? req.query.SortBy : 'name',
                sortorder: req.query.SortOrder ? req.query.SortOrder : 'ASC',
            };
            const roleService = new RoleService();
            const results = await roleService.LoadRoles(varparams);
            res.header("X-Page-TotalCount", results.length > 0 ? results[0].total : 0);

            const roleMapper = new RoleMapper();
            const mappedroles = roleMapper.ModelToDto(results);

            res.status(200).json(mappedroles);

        } catch (err) {
            new Logger().Error('GetRoles', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    }

    async UpsertRole(req, res) {
        try {
            const roleData = req.body;

            const roleMapper = new RoleMapper();
            const mappedRole = roleMapper.DtoToModel(roleData);

            const roleService = new RoleService();
            const result = await roleService.UpsertRole(mappedRole);

            if (result[0].result == 'Duplicate role name') {
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4223 });
                res.status(409).json({error: result.errormessage});
                return;
            };

            res.status(200).json({id:result[0].result});

        } catch (err) {
            new Logger().Error('UpsertRole', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    };

    async DeleteRole(req, res) {
        try {
            const roleId = req.params.Id;

            if(!validate(roleId)){
                const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:422});
                res.status(500).json({error: result.errormessage});
            };

            const roleService = new RoleService();
            let result = await roleService.DeleteRole(roleId);

            if(result[0].deleterole == false){
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4236 });
               res.status(409).json({error: result.errormessage});
               return;
           };

            res.status(200).json();

        } catch (err) {
            new Logger().Error('DeleteRole', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    }

   
}
