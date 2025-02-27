import { Sequelize, QueryTypes } from 'sequelize';
import moment from 'moment';
const dbConnect = require('../connect/index');
import { CommonService } from '../common/common';
import { ManufactureModel } from '../models/Manufacture';

export class ManufactureService {
    async LoadManufactures(varparams: any) {
        const query = `SELECT * FROM getmanufactures(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams: JSON.stringify(varparams) },
            type: QueryTypes.SELECT
        });
        return result;
    }

    async UpsertManufacture(manufactureData: any) {
        const query = `SELECT * FROM public.upsertmanufacture(:varjsondata)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsondata: JSON.stringify(manufactureData) },
            type: QueryTypes.SELECT
        });
        return result;
    }

    async DeleteManufacture(id: string) {
        const commonService = new CommonService();
        const result = await commonService.UpdateModelData(ManufactureModel, { guid: id }, { deleted: moment().format('YYYY-MM-DD HH:mm:ss') });
        return result;
    }

    async GetManufacture(id: string) {
        const query = `SELECT * FROM public.getmanufacture(:varmanufactureid)`;
        const result = await dbConnect.query(query, {
            replacements: { varmanufactureid: id },
            type: QueryTypes.SELECT
        });
        return result;
    }
}
