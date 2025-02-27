const Sequelize = require('sequelize');
const moment = require('moment');
const dbConnect = require('../connect/index');
import { CommonService } from '../common/common';
import { CheckoutInventoryModel } from '../models/CheckoutInventory'; // Adjust import path as needed

export class CheckoutInventoryService {
    async LoadCheckoutInventories(varparams: any) {
        const query = `SELECT * FROM getcheckoutinventories(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams: JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

    async UpsertCheckoutInventory(checkoutInventoryData: any) {
        const query = `SELECT * FROM public.upsertcheckoutinventory(:varjsondata)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsondata: JSON.stringify(checkoutInventoryData) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

    async DeleteCheckoutInventory(id: string) {
        const commonService = new CommonService();
        const result = await commonService.UpdateModelData(CheckoutInventoryModel, { guid: id }, { deleted: moment().format('YYYY-MM-DD HH:mm:ss') });
        return result;
    }

    async GetCheckoutInventory(id: string) {
        const query = `SELECT * FROM public.getcheckoutinventory(:varcheckoutinventoryid)`;
        const result = await dbConnect.query(query, {
            replacements: { varcheckoutinventoryid: id },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }
}
