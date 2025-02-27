import { EmailTemplateService } from '../services/EmailTemplateService';
import { Logger } from '../logger/logger';
import { EmailTemplateMapper } from '../mapper/EmailTemplateMapper';
import { CommonService } from '../common/common';
import { ErrorMessageModel } from '../models/ErrorMessages';
const commonService = new CommonService();


export class EmailTemplateController {
    async GetEmailTemplates(req, res) {
        try {
            const page = req.query.Page ? req.query.Page : 1;
            const limit = req.query.Limit ? req.query.Limit : 10;
            const pageOffSet = (page - 1) * limit;
            const pageLimit = limit;
            const varparams = {
                pageoffset: pageOffSet,
                pagelimit: pageLimit,
                search: req.query.Search ? req.query.Search : '',
                sortby: req.query.SortBy ? req.query.SortBy : 'subject',
                sortorder: req.query.SortOrder ? req.query.SortOrder : 'ASC'
            };

            const emailTemplateService = new EmailTemplateService();
            const emailTemplates = await emailTemplateService.LoadEmailTemplates(varparams);

            const emailTemplateMapper = new EmailTemplateMapper();
            const mappedEmailTemplates = emailTemplateMapper.ModelToDto(emailTemplates);

            res.status(200).json(mappedEmailTemplates);

        } catch (err) {
            new Logger().Error('GetEmailTemplates', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    };

    async UpsertEmailTemplate(req, res) {
        try {
            const templateData = req.body;

            // if (!templateData.subject || !templateData.body || !templateData.templatecode) {
            //     const commonService = new CommonService();
            //     const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 422 });
            //     res.status(422).json(result.dataValues.errormessage);
            //     return;
            // }

            const emailTemplateMapper = new EmailTemplateMapper();
            const mappedTemplate = emailTemplateMapper.DtoToModel(templateData);

            const emailTemplateService = new EmailTemplateService();
            const result = await emailTemplateService.UpsertEmailTemplate(mappedTemplate);

            res.status(200).json({id:result[0].result});

        } catch (err) {
            new Logger().Error('UpsertEmailTemplate', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    };

    async DeleteEmailTemplate(req, res) {
        try {
            const templateId = req.params.Id;

            const commonService = new CommonService();
            const isGuid: boolean = await commonService.isUUID(templateId);
            if (!isGuid) {
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 422 });
                res.status(422).json({error: result.errormessage});
                return;
            }

            const emailTemplateService = new EmailTemplateService();
            await emailTemplateService.DeleteEmailTemplate(templateId);

            res.status(200).json();

        } catch (err) {
            new Logger().Error('DeleteEmailTemplate', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    };

    async GetEmailTemplate(req, res) {
        try {
            const templateId = req.params.Id;

            const commonService = new CommonService();
            const isGuid: boolean = await commonService.isUUID(templateId);
            if (!isGuid) {
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 422 });
                res.status(422).json({error: result.errormessage});
                return;
            }

            const emailTemplateService = new EmailTemplateService();
            const emailTemplateData = await emailTemplateService.GetEmailTemplate(templateId);
            if (!emailTemplateData) {
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 404 });
                res.status(404).json({error: result.errormessage});
                return;
            }

            const emailTemplateMapper = new EmailTemplateMapper();
            const mappedTemplate = emailTemplateMapper.ModelToDto(emailTemplateData);

            res.status(200).json(mappedTemplate[0]);

        } catch (err) {
            new Logger().Error('GetEmailTemplate', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    };
}
