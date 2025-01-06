import { CommonService } from './../common/common';
import { ErrorMessageModel } from '.././models/ErrorMessages';
import { Logger } from "../logger/logger";
import { InventoryMapper } from "../mapper/InventoryMapper";
import { InventoryService } from "../services/InventoryService";
import { CategoryModel } from '../models/Category';
import { EmailTemplateModel } from '../models/EmailTemplate';
import { UserModel } from '../models/User';
import { EmailSender } from '../EmailSender/EmailSender';
import config from '../config/index'; 
import { InventoryDescriptionModel } from '../models/InventoryDescription';
const commonService = new CommonService();   


export class InventoryController {
    
    async GetInventories(req, res) {
         try {
            const page = req.query.Page ? req.query.Page : 1;
            const limit = req.query.Limit ? req.query.Limit : 10;
            const categoryId = req.query.CategoryId ? req.query.CategoryId : null;
            const pageOffSet = (page - 1) * limit;
            const pageLimit = limit;
            const varparams = {
                pageoffset: pageOffSet,
                pagelimit: pageLimit,
                search: req.query.Search ? req.query.Search : '',
                sortby: req.query.SortBy ? req.query.SortBy : 'expirationdate',
                sortorder: req.query.SortOrder ? req.query.SortOrder : 'ASC',
                categoryguid:categoryId

            };

            const inventoryService = new InventoryService();
            const results = await inventoryService.LoadInventories(varparams);
            res.header("X-Page-TotalCount", results.length > 0 ? results[0].total : 0);

            const inventoryMapper = new InventoryMapper();
            const mapped= inventoryMapper.ModelToDto(results);

            res.status(200).json(mapped);

        } catch (err) {
            new Logger().Error('GetInventories', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            return res.status(500).json({error: result.errormessage});
           
        }
    };

    async GetInventoriesPerCompany(req, res) {
        try {
           const page = req.query.Page ? req.query.Page : 1;
           const limit = req.query.Limit ? req.query.Limit : 10;
           const companyId = req.query.CompanyId ? req.query.CompanyId : null;
           const inventoryDescriptionId =  req.query.InventoryDescriptionId?req.query.InventoryDescriptionId:null;
           const pageOffSet = (page - 1) * limit;
           const pageLimit = limit;
           const varparams = {
               pageoffset: pageOffSet,
               pagelimit: pageLimit,
               search: req.query.Search ? req.query.Search : '',
               sortby: req.query.SortBy ? req.query.SortBy : '',
               sortorder: req.query.SortOrder ? req.query.SortOrder : '',
               companyguid:companyId,
               inventorydescriptionguid:inventoryDescriptionId

           };

           const inventoryService = new InventoryService();
           const results = await inventoryService.LoadInventoriesPerCompany(varparams);
           res.header("X-Page-TotalCount", results.length > 0 ? results[0].total : 0);

           const inventoryMapper = new InventoryMapper();
           const mapped= inventoryMapper.InventoriesPerCompanyMapper(results);

           res.status(200).json(mapped);

       } catch (err) {
           new Logger().Error('GetInventoriesPerCompany', err.toString(),  req.userId,req.clientId);
           const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
           return res.status(500).json({error: result.errormessage});
          
       }
   };


    async GetInventory(req, res) {
        
        try {
            const inventoryId = req.params.Id;
            const isGuid: boolean = await commonService.isUUID(inventoryId);

            if(!isGuid){
                const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:422});
                res.status(404).json({error: result.errormessage});
                return;
            };

            const inventoryService = new InventoryService();
            const results = await inventoryService.LoadInventory(inventoryId);

            const inventoryMapper = new InventoryMapper();
            const mappedData = inventoryMapper.DtoToModel(results[0]);

            res.status(200).json(mappedData);

        } catch (err) {
            new Logger().Error('GetInventory', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            return  res.status(500).json({error: result.errormessage});
        }
    };

    async UpsertInventory(req, res) {
       
        try {
            const inventoryData = req.body;

            if (!req.body.BranchId || req.body.BranchId == "" ){
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4222 });
                res.status(422).json({ error: result.errormessage});
                return;
            }
             
            if (!req.body.CompanyId || req.body.CompanyId == "" ){
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4225 });
                res.status(422).json({ error: result.errormessage});
                return;
            }

            // if (!req.body.PINumber || req.body.PINumber == ""){
            //     const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4226 });
            //     res.status(422).json({ error: result.errormessage});
            //     return;
            // }

            if (!req.body.CategoryId || req.body.CategoryId == ""){
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4227 });
                res.status(422).json({ error: result.errormessage});
                return;
            }

            if (!req.body.ContainerId || req.body.ContainerId == "" ){
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4232 });
                res.status(422).json({ error: result.errormessage});
                return;
            }

            if (!req.body.InventoryDescriptionId ||  req.body.InventoryDescriptionId == ""){
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4231 });
                res.status(422).json({ error: result.errormessage});
                return;
            }

            const inventoryDescriptionData = await commonService.GetModelData(InventoryDescriptionModel, { guid: req.body.InventoryDescriptionId});

            if (inventoryDescriptionData.hasexpirydate  == true && !req.body.ExpirationDate){
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4230 });
                res.status(422).json({ error: result.errormessage});
                return;
            };
            // IF pi_number IS NOT NULL AND pi_number <> '' THEN 
            // IF invoice_number IS NULL OR invoice_number = '' THEN RAISE EXCEPTION 'Invoice number is required when PI number is provided.'; END IF; END IF;
            
            const inventoryMapper = new InventoryMapper();
            const mappedData = inventoryMapper.DTOModel(inventoryData,req.userid);

            const inventoryService = new InventoryService();
            const result = await inventoryService.UpdateInventory(mappedData);

            // if (!mappedData.guid && result) {
            //     var preCheckinOrderCheckResult =  await inventoryService.CheckPreCheckInExists(mappedData.inventorydescriptionid)
            // };

            // if (preCheckinOrderCheckResult.length >0 ) {
            //     const emailTemplate = await commonService.GetModelData(EmailTemplateModel,{templatecode:'EmailTemplate-PreCheckoutInventoryArrived',deleted:null});

            //     if (!emailTemplate) {
            //         const errorMessage = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            //         res.status(500).json({ error: errorMessage.errormessage });
            //         return;
            //     };

            //     const userData = await commonService.GetModelData(UserModel,{id:req.userId});
                
            //     const emailSubject = emailTemplate.subject;
            
            //     const checkoutnumber = preCheckinOrderCheckResult[0].checkoutnumber;

            //     const emailBody = emailTemplate.body
            //         .replace('{firstname}', userData.firstname)
            //         .replace('{inventoryDescription}', preCheckinOrderCheckResult[0].description)
            //         .replace('{checkoutnumber}', checkoutnumber)
            //         .replace('{link}', config.dev_url + 'checkoutlist/' + checkoutnumber);

            //     const emailSender = new EmailSender();
            //     const mailResult = await emailSender.send(emailSubject, emailBody, userData.emailaddress);
            // };


            if(result == 'bar duplicate'){
                const commonService = new CommonService()
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4233 });
                res.status(409).json({ error: result.errormessage});
                return;
            };

            res.status(200).json({id:result});

        } catch (err) {
            new Logger().Error('UpsertInventory', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            return res.status(500).json({error: result.errormessage});
        }
    };

    async DeleteInventory(req, res) {
        try {
            const inventoryId = req.params.Id;
            const commonService = new CommonService();
            const isGuid: boolean = await commonService.isUUID(inventoryId);
            if(!isGuid){
                const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:422});
                res.status(500).json({error: result.errormessage});
            };

            const inventoryService = new InventoryService();
            await inventoryService.DestoryInventory(inventoryId);

            res.status(204).json();

        } catch (err) {
            new Logger().Error('DeleteInventory', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            return res.status(500).json({error: result.errormessage});
        }
    };

    async GetInventoryList(req, res) {
        try {
            const inventoryService = new InventoryService();
            const results = await inventoryService.LoadInventoryList();
           
            // const inventoryMapper = new InventoryMapper();
            // const mapped= inventoryMapper.ModelToDtoList(results);

            res.status(200).json(results[0].categoryinventory);

        } catch (err) {
            new Logger().Error('GetInventories', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            return res.status(500).json({error: result.errormessage});
           
        }
    };
}

