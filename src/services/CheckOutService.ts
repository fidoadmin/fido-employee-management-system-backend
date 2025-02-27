const Sequelize = require('sequelize');
const moment = require('moment');
const dbConnect = require('../connect/index');
import { CommonService } from '../common/common';
import { CheckoutModel } from '../models/Checkout'; 

export class CheckoutService {
    async LoadCheckouts(varparams: any) {
        const query = `SELECT * FROM getcheckouts(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams: JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async LoadCheckoutDetails(varcheckoutnumber: string) {
        const query = `SELECT * FROM getcheckoutdetails(:varcheckoutnumber)`;
        const result = await dbConnect.query(query, {
            replacements: { varcheckoutnumber: varcheckoutnumber },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };


    async VerifyCheckout(varparams: any) {
        const query = `SELECT * FROM verifycheckout(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams: JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async CancelCheckout(varparams: any) {
        const query = `SELECT * FROM cancelcheckout(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams: JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async GenerateCheckoutlist(varparams: any) {
        const query = `SELECT * FROM generatecheckoutlist(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams: JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async GetCheckoutlist(varcheckoutnumber: any) {
        const query = `SELECT * FROM getcheckoutlist(:varcheckoutnumber)`;
        const result = await dbConnect.query(query, {
            replacements: { varcheckoutnumber: varcheckoutnumber },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async GetCheckoutlistForChanllan(varparams: any) {
        const query = `SELECT * FROM getcheckoutlistforchallan(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams: JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async UpsertCheckout(checkoutData: any) {
        const query = `SELECT * FROM public.upsertcheckout(:varjsondata)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsondata: JSON.stringify(checkoutData) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async DeleteCheckout(id: string) {
        const commonService = new CommonService();
        const result = await commonService.UpdateModelData(CheckoutModel, { guid: id }, { deleted: moment().format('YYYY-MM-DD HH:mm:ss') });
        return result;
    };

    // async GetCheckoutForChallan(varparams) {
    //     const query = `SELECT * FROM public.getcheckoutlisttove(:varparams)`;
    //     const result = await dbConnect.query(query, {
    //         replacements: { varparams: varparams},  
    //         type: Sequelize.QueryTypes.SELECT
    //     });
    //     return result;
    // };
    

    async UpdateCheckoutInventoryQuantity(varparams: any) {
        const query = `SELECT * FROM updatecheckoutinventoryquantity(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams: JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };
}
