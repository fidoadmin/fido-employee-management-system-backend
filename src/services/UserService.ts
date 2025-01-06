const Sequelize = require('sequelize');
const dbConnect = require('../connect/index');
import {CommonService} from './../common/common';
import { UserModel } from '.././models/User';
import { UserLoginInfoModel } from '../models/Userlogininfo';
var moment = require('moment');
const commonService = new CommonService();

     export class UserService {
    
    async LoadUsers(varUsers) {
        const users = JSON.stringify(varUsers);
        const query = `SELECT * FROM common.getusers(:varusers)`;
        const result = await dbConnect.query(query, {
            replacements: { varusers:users },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async DestoryUser(UserId) {
         const commonService = new CommonService();
         const result = await commonService.UpdateModelData(UserModel,{guid:UserId},{deleted:moment().format('YYYY-MM-DD HH:mm:ss')});
        return result;
    };

    async LoadUser(userId) {
        const query = `SELECT * FROM  common.getuserprofile(:varuserguid) `;
        const result = await dbConnect.query(query, {
            replacements: { varuserguid :userId },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
   };

    async UpdateUser(userData:any) {
        
        const query = `SELECT * FROM common.upsertuser(:varuser)`;
        const result = await dbConnect.query(query, {
            replacements: { varuser :JSON.stringify(userData) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async GetAuthkeyDetail(authkey){
        const userData = await commonService.GetModelData(UserLoginInfoModel,{guid:authkey});
        return userData;
    }

    async GetUserPasswordDetail(userguid){
        const userData = await commonService.GetModelData(UserModel,{guid:userguid});
        // const userData = await commonService.GetUserPasswordDetail(UserModel,{emailaddress:loginBody.EmailAddress});
        return userData;
    }

   

}
