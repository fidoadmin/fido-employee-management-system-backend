import { PasswordChangeRequestService } from '../services/PasswordChangeRequestService';
import { EmailTemplateModel } from '../models/EmailTemplate';
import { Logger } from '../logger/logger';
import { CommonService } from '../common/common';
import { ErrorMessageModel } from '../models/ErrorMessages';
import { UserModel } from "../models/User";
import {EmailSender} from '../EmailSender/EmailSender';
import config from '../config';
import bcrypt from 'bcrypt';

const commonService = new CommonService();

export class PasswordChangeRequestController {
    async AddPasswordChangeRequest(req, res) {
        try {
            const body = req.body;
            
            const userData = await commonService.GetModelData(UserModel,{emailaddress:body.EmailAddress});
            
            if (!userData) {
                const errorMessage = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4221 });
                res.status(422).json({error:errorMessage.errormessage});
                return;
            };

            const passwordChangeRequestService = new PasswordChangeRequestService();
            const result = await passwordChangeRequestService.AddPasswordChangeRequest(userData.id);

            if (!result.length) {
                const errorMessage = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
                res.status(500).json({error:errorMessage.errormessage});
                return;
            };

            const emailTemplate = await commonService.GetModelData(EmailTemplateModel,{templatecode:'EmailTemplate-PasswordChange',deleted:null});

            if (!emailTemplate) {
                const errorMessage = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
                res.status(500).json({ error: errorMessage.errormessage });
                return;
            };

            const emailSubject = emailTemplate.subject
                .replace('{first name}', userData.firstname)
                .replace('{last name}', userData.lastname);

            const emailBody = emailTemplate.body
                .replace('{firstname}', userData.firstname)
                .replace('{resetLink}', config.dev_url + 'forgot-password/' + result[0].result);

            const emailSender = new EmailSender();
            const mailResult = await emailSender.send(emailSubject, emailBody, userData.emailaddress);
            
            res.status(200).json({Emailaddress:userData.emailaddress});

        } catch (err) {
            await new Logger().Error('AddPasswordChangeRequest', err.toString(), req.userId,req.clientId);
            const errorMessage = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error:errorMessage.errormessage});
        }
    };

    async VerifyAndUpdatePassword(req, res) {
        try {
            const newPassword = req.body.NewPassword;
            const changeRequestId = req.params.Id;
            const hashedPassword = await bcrypt.hash(newPassword, Number(config.saltKey));
            const passwordChangeRequestLimit = config.password_change_request_expiry_time
            const varparams =  {passwordchangerequestid :changeRequestId,newpassword:hashedPassword,passwordchangerequestlimit:passwordChangeRequestLimit};
            const passwordChangeRequestService = new PasswordChangeRequestService();
            const result = await passwordChangeRequestService.UpdatePassword(varparams);

            if (!result.length) {
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
                res.status(500).json({error:result.errormessage});
                return;
            };

            if(result[0].result == 'Password change request expired'){
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 410 });
                res.status(410).json({error:result.errormessage});
                return;
            };

            res.status(200).json({id:result[0].result});

        } catch (err) {
            await new Logger().Error('VerifyAndUpdatePassword', err.toString(), req.userId,req.clientId);
            const errorMessage = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error:errorMessage.errormessage});
        }
    };
}
