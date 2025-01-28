import { CommonService } from '../common/common';
import { UserLoginInfoModel } from '../models/Userlogininfo';
import { Logger } from '../logger/logger';
import { ErrorMessageModel } from '../models/ErrorMessages';

export class AuthController {

  async CheckAccessToken(req, res, next) {
    const token = req.headers.authkey;
  
    try {
      
      if (!token) {
        return res.status(412).send('Access denied. No token provided.');
      }
    
      const commonService = new CommonService();
      const tokenData = await commonService.GetModelData(UserLoginInfoModel, {deleted :null,guid:req.headers.authkey});
      
      if (!tokenData){
        return res.status(401).send('Access denied. No token provided.');
      }
      
      req.userId = tokenData.userid,
      req.clientId = tokenData.clientid,
      next();
  } catch (error) {
    const logger = new Logger();
    await logger.Error('Login', error.toString(), req.clientId, req.userId);

    const commonService = new CommonService();
    const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:500});

    res.status(500).json(result.dataValues.errormessage);
  }
}


  
}


  











