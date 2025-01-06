import { CompanyService } from "../services/CompanyService";
import { Logger } from "./../logger/logger";
import { CompanyMapper } from "../mapper/CompanyMapper";
import { CommonService } from './../common/common';
import { ErrorMessageModel } from '.././models/ErrorMessages';
const commonService = new CommonService();


export class CompanyController {

    async GetCompanies(req, res) {
        try {
            const page = req.query.Page ? req.query.Page : 1;
            const limit = req.query.Limit ? req.query.Limit : 10;
            const pageOffSet = (page - 1) * limit;
            const pageLimit = limit;
            const isInternal = req.query.IsInternal?req.query.IsInternal:false;
            const isSupplier = req.query.IsSupplier?req.query.IsSupplier:false;
            const isCustomer = req.query.IsCustomer?req.query.IsCustomer:false;
            const isManufacturer = req.query.IsManufacturer?req.query.IsManufacturer:false;

            const varparams = {
                pageoffset: pageOffSet,
                pagelimit: pageLimit,
                search: req.query.Search ? req.query.Search : '',
                sortby: req.query.SortBy ? req.query.SortBy : 'name',
                sortorder: req.query.SortOrder ? req.query.SortOrder : 'ASC',
                ismanufacturer:isManufacturer,
                iscustomer:isCustomer,
                issupplier:isSupplier,
                isinternal:isInternal
            };

            const companyService = new CompanyService();
            const results = await companyService.LoadCompanies(varparams);
            res.header("X-Page-TotalCount", results.length > 0 ? results[0].total : 0);

            const companyMapper = new CompanyMapper();
            const mappedComapnies = companyMapper.ModelToDto(results);

            res.status(200).json(mappedComapnies);

        } catch (err) {
            new Logger().Error('GetCompanies', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    };

    async UpsertCompany(req, res) {
        try {
            const companyData = req.body;

           
            const companyMapper = new CompanyMapper();
            const mappedCompany = companyMapper.DtoToModel(companyData);

            const companyService = new CompanyService();
            const result = await companyService.UpsertCompany(mappedCompany);

            if (result[0].result == 'Duplicate company name') {
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4223 });
                res.status(409).json({error: result.errormessage});
                return;
            };
            
            res.status(200).json({Id:result[0].result});

        } catch (err) {
            new Logger().Error('UpsertCompany', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    };

    async DeleteCompany(req, res) {
        try {
            const companyguid = req.params.Id;

            const isGuid: boolean = await commonService.isUUID(companyguid);
            if(!isGuid){
                const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:422});
                res.status(500).json({error: result.errormessage});
            };

            
            const companyService = new CompanyService();
            let result = await companyService.DeleteCompany(companyguid);
            if(result[0].deletedeleted == false){
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4237 });
               res.status(409).json({error: result.errormessage});
               return;
           };

            res.status(200).json();

        } catch (err) {
            new Logger().Error('DeleteCompany', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    };

   

}
