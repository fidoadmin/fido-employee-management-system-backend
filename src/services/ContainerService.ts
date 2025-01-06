const Sequelize = require('sequelize');
const dbConnect = require('../connect/index');
const moment = require('moment');
import { CommonService } from '../common/common';
import { ContainerModel } from '.././models/Container';



export class ContainerService {
    async LoadContainers(varparams) {
        const query = `SELECT * FROM getcontainers(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams: JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

    async UpsertContainer(containerData) {
        const query = `SELECT * FROM  public.upsertcontainer(:varjsondata)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsondata: JSON.stringify(containerData) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

    async DeleteContainer(id: string) {
        const commonService = new CommonService();
        const result = await commonService.UpdateModelData(ContainerModel, { guid: id }, { deleted: moment().format('YYYY-MM-DD HH:mm:ss') });
        return result;
    }

    async GetContainer(id) {
        const query = `SELECT * FROM public.getcontainer(:varcontainerid)`;
        const result = await dbConnect.query(query, {
            replacements: { varcontainerid: id },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }
}
