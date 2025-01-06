import { CommonService } from './../common/common';
import { ErrorMessageModel } from '.././models/ErrorMessages';
import { Logger } from "../logger/logger";
import { InventoryDescriptionMapper } from '../mapper/InventoryDescriptionMapper';
import { InventoryDescriptionService } from '../services/InventoryDescriptionService';
const commonService = new CommonService();   


export class InventoryDescriptionController {
    
    async GetInventoryDescriptions(req, res) {
         try {

            const page = req.query.Page ? req.query.Page : 0;
            const limit = req.query.Limit ? req.query.Limit : 0;
            const categoryId = req.query.CategoryId ? req.query.CategoryId : null;
            const companyId = req.query.CompanyId ? req.query.CompanyId : null;
            const branchId = req.query.BranchId ? req.query.BranchId : null;
            const pageOffSet = (page - 1) * limit;
            const checkoutData = req.query.IsCheckout ? req.query.IsCheckout :false;
            const isFromDispatch =  req.query.IsFromDispatch?req.query.IsFromDispatch:false;
            const pageLimit = limit;
            const varparams = {
                pageoffset: pageOffSet,
                pagelimit: pageLimit,
                search: req.query.Search ? req.query.Search : '',
                sortby: req.query.SortBy ? req.query.SortBy : 'description',
                sortorder: req.query.SortOrder ? req.query.SortOrder : 'ASC',
                categoryguid:categoryId,
                companyguid:companyId,
                branchguid:branchId,
                checkoutdata :checkoutData,
                isfromdispatch:isFromDispatch
            };
            
            const inventoryDescriptionService = new InventoryDescriptionService();
            const results = await inventoryDescriptionService.LoadInventoryDescriptions(varparams);
            res.header("X-Page-TotalCount", results.length > 0 ? results[0].total : 0);
           
            const inventoryDescriptionMapper = new InventoryDescriptionMapper();
            const mapped = inventoryDescriptionMapper.ModelToDto(results);

            res.status(200).json(mapped);

        } catch (err) {
            new Logger().Error('GetInventoryDescriptions', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            return res.status(500).json({error: result.errormessage});
           
        }
    };

    async GetInventoryDescriptionsForMaintenance(req, res) {
        try {

           const page = req.query.Page ? req.query.Page : 0;
           const limit = req.query.Limit ? req.query.Limit : 0;
           const categoryId = req.query.CategoryId ? req.query.CategoryId : null;
           const dateFrom = req.query.FromDate?req.query.FromDate:null;
           const dateTo =  req.query.ToDate?req.query.ToDate:null;
           const pageOffSet = (page - 1) * limit;
           const pageLimit = limit;
           const varparams = {
               pageoffset: pageOffSet,
               pagelimit: pageLimit,
               search: req.query.Search ? req.query.Search : '',
               sortby: req.query.SortBy ? req.query.SortBy : 'description',
               sortorder: req.query.SortOrder ? req.query.SortOrder : 'ASC',
               categoryguid:categoryId,
               instock: req.query.InStock ? req.query.InStock : false,
               outstock: req.query.OutStock ? req.query.OutStock : false,
               datefrom:dateFrom,
               dateto:dateTo,
               isfromreport:req.query.IsFromReport?req.query.IsFromReport:false
           };
           
           const inventoryDescriptionService = new InventoryDescriptionService();
           const results = await inventoryDescriptionService.LoadInventoryDescriptionsForMaintenance(varparams);
           res.header("X-Page-TotalCount", results.length > 0 ? results[0].totalcount : 0);
          
           const inventoryDescriptionMapper = new InventoryDescriptionMapper();
           const mapped = inventoryDescriptionMapper.ModelToDtoForMaintenance(results);

           res.status(200).json(mapped);

       } catch (err) {
           new Logger().Error('GetInventoryDescriptionsForMaintenance', err.toString(),  req.userId,req.clientId);
           const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
           return res.status(500).json({error: result.errormessage});
          
       }
   };

    async GetInventoryDescription(req, res) {
        
        try {
            const descriptionId = req.params.Id;
            const isGuid: boolean = await commonService.isUUID(descriptionId);

            if(!isGuid){
                const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:422});
                res.status(404).json({error: result.errormessage});
                return;
            };

            const inventoryDescriptionService = new InventoryDescriptionService();
            const results = await inventoryDescriptionService.LoadInventoryDescription(descriptionId);

            const inventoryDescriptionMapper = new InventoryDescriptionMapper();
            const mappedData = inventoryDescriptionMapper.DtoToModel(results);

            res.status(200).json(results[0].results);

        } catch (err) {
            new Logger().Error('GetInventoryDescription', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            return  res.status(500).json({error: result.errormessage});
        }
    };

    async UpsertInventoryDescription(req, res) {
       
        try {
            const descriptionData = req.body;

            if (!req.body.Description){
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4231 });
                res.status(422).json({ error: result.errormessage});
                return;
            }

            if (!req.body.Id) {
                if (!req.body.ManufacturerId) {
                    const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4223 });
                    res.status(422).json({ error: result.errormessage });
                    return;
                }
    
                if (!req.body.CategoryId) {
                    const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4227 });
                    res.status(422).json({ error: result.errormessage });
                    return;
                }
            }
            
            const inventoryDescriptionMapper = new InventoryDescriptionMapper();
            const mappedData = inventoryDescriptionMapper.DTOModel(descriptionData,req.userId);

            const inventoryDescriptionService = new InventoryDescriptionService();
            const result = await inventoryDescriptionService.UpdateInventoryDescription(mappedData);

            res.status(200).json({id:result});

        } catch (err) {
            new Logger().Error('UpsertInventoryDescription', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            return res.status(500).json({error: result.errormessage});
            
        }
    };

    async DeleteInventoryDescription(req, res) {
        try {
            const inventoryDescriptionId = req.params.Id;
            const commonService = new CommonService();
            const isGuid: boolean = await commonService.isUUID(inventoryDescriptionId);
            if(!isGuid){
                const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:422});
                res.status(500).json({error: result.errormessage});
                return;
            };

            const inventoryDescriptionService = new InventoryDescriptionService();
            const result =  await inventoryDescriptionService.DeleteInventoryDescription(inventoryDescriptionId);

            if(!result){
                const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:4092});
                res.status(409).json({error: result.errormessage});
                return;
            };

            res.status(204).json();

        } catch (err) {
            new Logger().Error('DeleteInventoryDescription', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            return res.status(500).json({error: result.errormessage});
        }
    };

  
}

