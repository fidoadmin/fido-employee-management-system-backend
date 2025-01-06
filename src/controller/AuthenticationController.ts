import { Logger } from "./../logger/logger";
import { CommonService } from './../common/common';
import { ErrorMessageModel } from '.././models/ErrorMessages';
import bcrypt from 'bcrypt';
import { AuthenticationService } from "../services/AuthenticationService";
import { AuthenticationMapper } from "../mapper/AuthenticationMapper";
import { UserModel } from "../models/User";

var moment = require('moment');
const commonService = new CommonService();
export class AuthenticationController {

    async Login(req, res) {
        
        try {
            const loginBody = req.body;
            const userData = await commonService.GetModelData(UserModel,{emailaddress:loginBody.EmailAddress});

            if(userData == null){
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4221 });
                res.status(401).json({error: result.errormessage });
                return ;
            }

            const match = await bcrypt.compare(loginBody.Password, userData.password);

            if (match) {

                const authenticationMapper = new AuthenticationMapper();
                const mappedLogin = authenticationMapper.ModelToDTO(userData,loginBody.Source);

                const authenticationService = new AuthenticationService();
                const loginData = await authenticationService.UpsertLogin(mappedLogin);
                
                const results = authenticationMapper.LoginResponse(loginData,userData);

                res.status(200).json(results);
             
            } else {
                res.status(401).json({ error: 'Invalid password' });
            }
            
        }catch (err) {
            await new Logger().Error('Login', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
            
        }
    }

    async Logout(req, res) {

        try {
            const authKey = req.headers.authkey;
            
            const authenticationService = new AuthenticationService();
            await authenticationService.Logout(authKey);
          
            return res.status(204).send(""); 
            
        }catch (err) {
            await new Logger().Error('Logout', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
            
        }
    }

}