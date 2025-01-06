const nodemailer = require('nodemailer');
import config from '../config/index';


export class EmailSender {
   

    newTransport(){
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:config.app_email,
                pass: config.email_password
            }
        })
    }
    async send(mailSubject: string, mailBody: string, recipientEmail: string){
       const mailDetails = {
            from: config.app_email,
            to: recipientEmail,
            subject: mailSubject,
            html: mailBody
        };

       await this.newTransport().sendMail(mailDetails)
       
    }

}