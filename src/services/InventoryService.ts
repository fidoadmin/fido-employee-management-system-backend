const Sequelize = require('sequelize');
const dbConnect = require('../connect/index');
import {CommonService} from './../common/common';
import { InventoryModel } from '../models/Inventory';
var moment = require('moment');

export class InventoryService {
    
    async LoadInventories(inventories:any) {
        const query = `SELECT * FROM public.getinventories(:varinventories)`;
        const result = await dbConnect.query(query, {
            replacements: { varinventories : JSON.stringify(inventories) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async LoadInventoriesPerCompany(varparams:any) {
        const query = `SELECT * FROM public.getinventorylistpercompany(:varparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varparams : JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async DestoryInventory(inventoryId) {
        const commonService = new CommonService();
        await commonService.UpdateModelData(InventoryModel,{guid:inventoryId},{deleted:moment().format('YYYY-MM-DD HH:mm:ss')});
        return null;
    };

    async LoadInventory(inventoryId:any) {

        const query = `SELECT * FROM  public.getinventory(:varinventoryguid) AS guid`;
        const result = await dbConnect.query(query, {
            replacements: { varinventoryguid :inventoryId },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
        
   };

    async UpdateInventory(inventoryData:any) {

        const query = `SELECT * FROM public.upsertinventory(:varinventory)`;
        const result = await dbConnect.query(query, {
            replacements: { varinventory :JSON.stringify(inventoryData) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result[0].results ;

    };

    async LoadInventoryList() {
        const query = `SELECT * FROM  public.getinventorieslist()`;
        const result = await dbConnect.query(query, {
            replacements: { },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async CheckPreCheckInExists(inventoryDescriptionGuid:string) {
        const query = `SELECT * FROM  public.checkprecheckinexists(:varinventorydescriptionguid)`;
        const result = await dbConnect.query(query, {
            replacements: {varinventorydescriptionguid: inventoryDescriptionGuid},
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };
}
