const Sequelize = require('sequelize');
const dbConnect = require('../connect/index');
import { UserLoginInfoModel } from "../models/Userlogininfo";
import { UserModel } from "../models/User";
import { CommonService } from './../common/common';
var moment = require('moment')


export class AuthenticationService {

    async UpsertLogin(loginData:any) {
       
        const query = `SELECT * FROM common.userlogin_TEST(:varlogin)`;
        const result = await dbConnect.query(query, {
            replacements: { varlogin: JSON.stringify(loginData) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

    async Logout(authKey) {
        
        const commonService = new CommonService();
        await commonService.UpdateModelData(UserLoginInfoModel,{guid:authKey},{loggedout:moment().format('YYYY-MM-DD HH:mm:ss'),deleted:moment().format('YYYY-MM-DD HH:mm:ss')});
        return ;
    }
}