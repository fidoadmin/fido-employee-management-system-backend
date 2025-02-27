const Sequelize = require('sequelize');
var moment = require('moment');
const dbConnect = require('../connect/index');
import { CommonService } from '../common/common';
import { EmailTemplateModel } from '.././models/EmailTemplate';

export class EmailTemplateService {
    async LoadEmailTemplates(varparams: any) {
        const query = `SELECT * FROM public.getemailtemplates(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams: JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async UpsertEmailTemplate(templateData: any) {
        const query = `SELECT * FROM public.upsertemailtemplate(:vartemplateData)`;
        const result = await dbConnect.query(query, {
            replacements: { vartemplateData: JSON.stringify(templateData) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async DeleteEmailTemplate(templateGuid: string) {
        const commonService = new CommonService(); 
        const result = await commonService.UpdateModelData(EmailTemplateModel, { guid: templateGuid }, { deleted: moment().format('YYYY-MM-DD HH:mm:ss') });
        return result;
    };

    async GetEmailTemplate(templateGuid: string) {
        const query = `SELECT * FROM public.getemailtemplate(:vartemplateguid) AS guid`;
        const result = await dbConnect.query(query, {
            replacements: { vartemplateguid: templateGuid },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };
}
