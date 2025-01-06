import { CategoryService } from "../services/CategoryService";
import { Logger } from "./../logger/logger";
import { CategoryMapper } from "../mapper/CategoryMapper";
import { CommonService } from './../common/common';
import { ErrorMessageModel } from '../models/ErrorMessages';
const commonService = new CommonService();

export class CategoryController {
    
    async GetCategories(req, res) {
        try {
            const page = req.query.Page ? req.query.Page : 0;
            const limit = req.query.Limit ? req.query.Limit : 0;
            const pageOffSet = (page - 1) * limit;
            const pageLimit = limit;
            const varparams = {
                pageoffset: pageOffSet,
                pagelimit: pageLimit,
                search: req.query.Search ? req.query.Search : '',
                sortby: req.query.SortBy ? req.query.SortBy : 'name',
                sortorder: req.query.SortOrder ? req.query.SortOrder : 'ASC'
            };

            const categoryService = new CategoryService();
            const categories = await categoryService.LoadCategories(varparams);
            res.header("X-Page-TotalCount", categories.length > 0 ? categories[0].total : 0);
            
            const categoryMapper = new CategoryMapper();
            const mappedCategories = categoryMapper.ModelToDto(categories);

            res.status(200).json(mappedCategories);

        } catch (err) {
            new Logger().Error('GetCategories', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    }

    async UpsertCategory(req, res) {
        try {
            const categoryData = req.body;
            

            const categoryMapper = new CategoryMapper();
            const mappedCategory = categoryMapper.DtoToModel(req,categoryData);

            const categoryService = new CategoryService();
            const result = await categoryService.UpsertCategory(mappedCategory);

            if(result[0].result == 'type duplicate'){
                const commonService = new CommonService()
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4091 });
                res.status(409).json({error: result.errormessage});
                return;
            };

            res.status(200).json({id:result[0].result});

        } catch (err) {
            new Logger().Error('UpsertCategory', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    }

    async DeleteCategory(req, res) {
        try {
            const categoryGuid = req.params.Id;
            
            const isGuid = await commonService.isUUID(categoryGuid);
            if (!isGuid) {
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 422 });
                res.status(422).json({error: result.errormessage});
                return;
            }

            const categoryService = new CategoryService();
            let result  = await categoryService.DeleteCategory(categoryGuid);
            if ( result[0].result == true){
                res.status(200).json();
            }else{
                res.status(404).json();
            }

            

        } catch (err) {
            new Logger().Error('DeleteCategory', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    }

 
}
