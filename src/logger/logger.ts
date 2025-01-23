import {CommonService} from './../common/common';
import { LogModel } from '../models/Log';
export class Logger {
    async Error(message, description, userId,clientId) {
    try {
        const logToAdd = {
            message:message,
            description:description,
            userid:userId,
            clientid:clientId,
            severity:'E'
        };
        const commonService = new CommonService();
        await commonService.AddModelData(LogModel,logToAdd);
    } catch (error) {
      console.error('Error adding error log:', error);
    }
  };
  async Info(message, description, userId,clientId) {
    try {
        const logToAdd = {
            message:message,
            description:description,
            userid:userId,
            clientid:clientId,
            severity:'I'
        };
        const commonService = new CommonService();
        await commonService.AddModelData(LogModel,logToAdd);
    } catch (error) {
      console.error('Error adding error log:', error);
    };
  };
  async Debug(message, description, userId,clientId) {
    try {
        const logToAdd = {
            message:message,
            description:description,
            userid:userId,
            clientid:clientId,
            severity:'D'
        };
        const commonService = new CommonService();
        await commonService.AddModelData(LogModel,logToAdd);
    } catch (error) {
      console.error('Error adding error log:', error);
    }
  };
}






