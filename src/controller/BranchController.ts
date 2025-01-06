import { BranchService } from "../services/BranchService";
import { Logger } from "./../logger/logger";
import { BranchMapper } from "../mapper/BranchMapper";
import { CommonService } from './../common/common';
import { ErrorMessageModel } from '../models/ErrorMessages';
const commonService = new CommonService();

export class BranchController {

    async GetBranches(req, res) {
        try {
            const page = req.query.Page ? parseInt(req.query.Page) : 0;
            const limit = req.query.Limit?parseInt(req.query.Limit):0;
            const companyId = req.query.CompanyId ? req.query.CompanyId : null;
            const isEntryPoint  = req.query.IsEntryPoint ? req.query.IsEntryPoint: null;;
            const pageoffset = (page - 1) * limit;
            const pagelimit = limit;
            const varparams = {
                pageoffset: pageoffset,
                pagelimit: pagelimit,
                search: req.query.Search ? req.query.Search : '',
                sortby: req.query.SortBy ? req.query.SortBy : 'name',
                sortorder: req.query.SortOrder ? req.query.SortOrder : 'ASC',
                companyguid:companyId,
                isentrypoint:isEntryPoint
            };
            const branchService = new BranchService();
            const results = await branchService.LoadBranches(varparams);
            res.header("X-Page-TotalCount", results.length > 0 ? results[0].total : 0);


            const branchMapper = new BranchMapper();
            const mappedBranches = branchMapper.ModelToDto(results);

            res.status(200).json(mappedBranches);

        } catch (err) {
            new Logger().Error('GetBranches', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    }

    async UpsertBranch(req, res) {
        try {
            const branchData = req.body;

            const branchMapper = new BranchMapper();
            const mappedBranch = branchMapper.DtoToModel(branchData);

            const branchService = new BranchService();
            const result = await branchService.UpsertBranch(mappedBranch);

            if (result[0].result == 'Duplicate branch name') {
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4223 });
                res.status(409).json({error: result.errormessage});
                return;
            };

            res.status(200).json({Id:result[0].result});

        } catch (err) {
            new Logger().Error('UpsertBranch', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    };

    async DeleteBranch(req, res) {
        try {
            const branchId = req.params.Id;

            const isGuid: boolean = await commonService.isUUID(branchId);
            if (!isGuid) {
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 422 });
                res.status(422).json({error: result.errormessage});
            };

            const branchService = new BranchService();
            let result = await branchService.DeleteBranch(branchId);

            if(result[0].deletebranch == false){
                 const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4232 });
                res.status(409).json({error: result.errormessage});
                return;
            };

            

            res.status(200).json();

        } catch (err) {
            new Logger().Error('DeleteBranch', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    }

   
}
