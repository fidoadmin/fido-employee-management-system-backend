import { Log } from '../models/Log';
import {CommonService} from './../common/common';

export class Logger {
    async Error(message, description, userId) {
    
    try {

        const logToAdd = {
            message:message,
            description:description,
            userid:userId,
            severity:'E'
        };
        
        const commonService = new CommonService();
        await commonService.AddModelData(Log,logToAdd);

    } catch (error) {
      console.error('Error adding error log:', error);
    }

  };

  async Info(message, description, userId) {

    try {

        const logToAdd = {
            message:message,
            description:description,
            userid:userId,
            severity:'I'
        };

        const commonService = new CommonService();
        await commonService.AddModelData(Log,logToAdd);

    } catch (error) {
      console.error('Error adding error log:', error);
    };

  };

  async Debug(message, description, userId) {

    try {
        
        const logToAdd = {
            message:message,
            description:description,
            userid:userId,
            severity:'D'
        };

        const commonService = new CommonService();
        await commonService.AddModelData(Log,logToAdd);

    } catch (error) {
      console.error('Error adding error log:', error);
    }
    
  };

}


