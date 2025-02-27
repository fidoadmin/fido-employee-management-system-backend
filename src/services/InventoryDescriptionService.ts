const Sequelize = require('sequelize');
const dbConnect = require('../connect/index');
import {CommonService} from './../common/common';
import { InventoryDescriptionModel } from '../models/InventoryDescription';
var moment = require('moment');

export class InventoryDescriptionService {
    
    async LoadInventoryDescriptions(descriptions:any) {
        const query = `SELECT * FROM public.getinventorydescriptions(:varinventorydescriptions)`;
        const result = await dbConnect.query(query, {
            replacements: { varinventorydescriptions : JSON.stringify(descriptions) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async LoadInventoryDescriptionsForMaintenance(descriptions:any) {
        const query = `SELECT * FROM public.getinventorydescriptionformaintenance(:varinventorydescriptions)`;
        const result = await dbConnect.query(query, {
            replacements: { varinventorydescriptions : JSON.stringify(descriptions) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async DeleteInventoryDescription(descriptionId) {
        const query = `SELECT * FROM public.deleteinventorydescription(:varinventorydescriptionguid)`;
        const result = await dbConnect.query(query, {
            replacements: { varinventorydescriptionguid: descriptionId },
            type: Sequelize.QueryTypes.SELECT
        });
        return result.length > 0 ? result[0].result : null;
    };

    async LoadInventoryDescription(descriptionId:any) {
        const query = `SELECT * FROM  public.getinventorydescription(:vardescriptionguid) AS guid`;
        const result = await dbConnect.query(query, {
            replacements: { vardescriptionguid :descriptionId },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
   };

    async UpdateInventoryDescription(descriptionData:any) {
        const query = `SELECT * FROM public.upsertinventorydescriptions(:vardescription)`;
        const result = await dbConnect.query(query, {
            replacements: { vardescription :JSON.stringify(descriptionData) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result[0].results ;
    };

   
  
}
