import { Logger } from "./../logger/logger";
import { CommonService } from './../common/common';
import { ErrorMessageModel } from '../models/ErrorMessages';
import { CompanyTypeService } from "../services/CompanyTypeService";
import { CompanyTypeMapper } from "../mapper/CompanyTypeMapper";
const commonService = new CommonService();

export class CompanyTypeController {

    async GetCompanyTypes(req, res) {
        try {
            const page = req.query.Page ? parseInt(req.query.Page) : 0;
            const limit = req.query.Limit?parseInt(req.query.Limit):0;
            const pageoffset = (page - 1) * limit;
            const pagelimit = limit;
            const varparams = {
                pageoffset: pageoffset,
                pagelimit: pagelimit,
                search: req.query.varsearch ? req.query.varsearch : '',
                sortby: req.query.varsortby ? req.query.varsortby : 'name',
                sortorder: req.query.varsortorder ? req.query.varsortorder : 'ASC',
            };

            const companyTypeService = new CompanyTypeService();
            const results = await companyTypeService.LoadCompanyTypes(varparams);
            res.header("X-Page-TotalCount", results.length > 0 ? results[0].total : 0);

            const companyTypeMapper = new CompanyTypeMapper();
            const mapperresults = companyTypeMapper.ModelToDto(results);

            res.status(200).json(mapperresults);

        } catch (err) {
            new Logger().Error('GetCompanyTypes', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    }
   
}
