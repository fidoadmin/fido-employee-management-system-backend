<<<<<<< HEAD
import {  UserService } from "../services/UserService";
import { Logger } from "./../logger/logger";
import {  UserMapper } from "../mapper/UserMapper";
import { CommonService } from './../common/common';
import { ErrorMessageModel } from '.././models/ErrorMessages';
import bcrypt from 'bcrypt';
const config = require('../config/index').default;
const commonService = new CommonService();
import { validate } from 'uuid';


export class UserController {
    
    async GetUsers(req, res) {
         try {
            
            const page = req.query.Page ? req.query.Page : 1;
            const limit = req.query.Limit ? req.query.Limit : 10;
            const pageOffSet = (page - 1) * limit;
            const pageLimit = limit;
            const varparams = {
                pageoffset: pageOffSet,
                pagelimit: pageLimit,
                search: req.query.Search ? req.query.Search : '',
                sortby: req.query.SortBy ? req.query.SortBy : 'emailaddress',
                sortorder: req.query.SortOrder ? req.query.SortOrder : 'ASC'
            };

            const userService = new UserService();
            const users = await userService.LoadUsers(varparams);
            res.header("X-Page-TotalCount", users.length > 0 ? users[0].total : 0);

            const userMapper = new UserMapper();
            const mappedUsers = userMapper.ModelToDto(users);

            res.status(200).json(mappedUsers);

        } catch (err) {
            new Logger().Error('GetUsers', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    };

    // async GetUser(req, res) {
    //     try {
    //         const userId = req.params.Id;
           
    //         const isGuid: boolean = await commonService.isUUID(userId);
    //         if(!isGuid){
    //             const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:422});
    //             res.status(500).json({error: result.errormessage});
    //         };

    //         const userService = new UserService();
    //         const userData = await userService.LoadUser(userId);

    //         const userMapper = new UserMapper();
    //         const mappedUser = userMapper.ModelToDto(userData);

    //         res.status(200).json(mappedUser);

    //     } catch (err) {
    //         new Logger().Error('GetUser', err.toString(),  req.userId);
    //         const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
    //         res.status(500).json({error: result.errormessage});
    //     }
    // };

    async UpsertUser(req, res) {
        try {
            const userData = req.body;
            if (userData.Id = null ){
                if (!userData.Password) {
                    return res.status(400).json({ error: 'Password is required' });
                }
            
                const saltRounds = Number(config.saltKey);
                const hashedPassword = await bcrypt.hash(userData.Password, saltRounds);
                userData.Password = hashedPassword;
                
            }
            const userMapper = new UserMapper();
            const mappedUser = userMapper.DtoToModel(userData);

            const userService = new UserService();
            const newUser = await userService.UpdateUser(mappedUser);

            if(newUser[0].userguid == 'emailaddress duplicate'){
                const commonService = new CommonService()
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 409 });
                return res.status(409).json({error: result.errormessage});
               
            };

            res.status(200).json({"Id":newUser[0].userguid});

        } catch (err) {
            new Logger().Error('UpsertUser', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
            
        }
    };

    async DeleteUser(req, res) {

        try {
            const userId:string  = req.params.Id;
          
            if(!validate(userId)){
                const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:422});
                res.status(500).json({error: result.errormessage});
            };

            const userService = new UserService();
            await userService.DestoryUser(userId);

            res.status(204).json();

        } catch (err) {
            new Logger().Error('DeleteUser', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    };

    async GetUserProfile(req,res){
        try {
            const userId:string  = req.params.Id;
            const userService = new UserService();
            let authkeyData = await userService.GetAuthkeyDetail(req.headers.authkey);
           
            if(!validate(userId)){
                const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:422});
                res.status(500).json({error: result.errormessage});
            };
         
            const userData = await userService.LoadUser(userId);

            if(userData[0].userid == authkeyData.userid){
                const userMapper = new UserMapper();
                const mappedUser = userMapper.ModelToDto(userData);

                res.status(200).json(mappedUser[0]);
            }else{
                const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:4234});
                res.status(422).json({error: result.errormessage});
            }

            

        } catch (err) {
            new Logger().Error('GetUserProfile', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    }

    async UpdatePassword(req,res){
        try {
            const userBody = req.body;

            const userService = new UserService();
            const userData = await userService.GetUserPasswordDetail(userBody.Id);
            const match =  await bcrypt.compare(userBody.CurrentPassword, userData.password);
            if (match) {
                const saltRounds = Number(config.saltKey);
                const hashedPassword = await bcrypt.hash(userBody.ChangePassword, saltRounds);
                userData.Password = hashedPassword;
                

                const userMapper = new UserMapper();
                const mappedUser = userMapper.ModelPassword(userData);
               
                const newUser = await userService.UpdateUser(mappedUser);

                res.status(200).json({"Id":newUser[0].userguid});
            }else{
                const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:4235});
                res.status(422).json({error: result.errormessage});
            }
                       
        }catch (err) {
            await new Logger().Error('UpdatePassword', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
            
        }
    }
}

    


=======
import {  UserService } from "../services/UserService";
import { Logger } from "./../logger/logger";
import {  UserMapper } from "../mapper/UserMapper";
import { CommonService } from './../common/common';
import { ErrorMessageModel } from '.././models/ErrorMessages';
import bcrypt from 'bcrypt';
const config = require('../config/index').default;
const commonService = new CommonService();
import { validate } from 'uuid';


export class UserController {
    
    async GetUsers(req, res) {
         try {
            
            const page = req.query.Page ? req.query.Page : 1;
            const limit = req.query.Limit ? req.query.Limit : 10;
            const pageOffSet = (page - 1) * limit;
            const pageLimit = limit;
            const varparams = {
                pageoffset: pageOffSet,
                pagelimit: pageLimit,
                search: req.query.Search ? req.query.Search : '',
                sortby: req.query.SortBy ? req.query.SortBy : 'emailaddress',
                sortorder: req.query.SortOrder ? req.query.SortOrder : 'ASC'
            };

            const userService = new UserService();
            const users = await userService.LoadUsers(varparams);
            res.header("X-Page-TotalCount", users.length > 0 ? users[0].total : 0);

            const userMapper = new UserMapper();
            const mappedUsers = userMapper.ModelToDto(users);

            res.status(200).json(mappedUsers);

        } catch (err) {
            new Logger().Error('GetUsers', err.toString(),  req.userId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    };

    // async GetUser(req, res) {
    //     try {
    //         const userId = req.params.Id;
           
    //         const isGuid: boolean = await commonService.isUUID(userId);
    //         if(!isGuid){
    //             const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:422});
    //             res.status(500).json({error: result.errormessage});
    //         };

    //         const userService = new UserService();
    //         const userData = await userService.LoadUser(userId);

    //         const userMapper = new UserMapper();
    //         const mappedUser = userMapper.ModelToDto(userData);

    //         res.status(200).json(mappedUser);

    //     } catch (err) {
    //         new Logger().Error('GetUser', err.toString(),  req.userId);
    //         const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
    //         res.status(500).json({error: result.errormessage});
    //     }
    // };

    async UpsertUser(req, res) {
        try {
            const userData = req.body;
            if (userData.Id == null ){
                if (!userData.Password) {
                    return res.status(400).json({ error: 'Password is required' });
                }
            
                const saltRounds = Number(config.saltKey);
                const hashedPassword = await bcrypt.hash(userData.Password, saltRounds);
                userData.Password = hashedPassword;
                
            }
            const userMapper = new UserMapper();
            const mappedUser = userMapper.DtoToModel(userData);

            const userService = new UserService();
            const newUser = await userService.UpdateUser(mappedUser);

            if(newUser[0].userguid == 'emailaddress duplicate'){
                const commonService = new CommonService()
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 409 });
                return res.status(409).json({error: result.errormessage});
               
            };

            res.status(200).json({"Id":newUser[0].userguid});

        } catch (err) {
            new Logger().Error('UpsertUser', err.toString(),  req.userId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
            
        }
    };

    async DeleteUser(req, res) {

        try {
            const userId:string  = req.params.Id;
          
            if(!validate(userId)){
                const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:422});
                res.status(500).json({error: result.errormessage});
            };

            const userService = new UserService();
            await userService.DestoryUser(userId);

            res.status(204).json();

        } catch (err) {
            new Logger().Error('DeleteUser', err.toString(),  req.userId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    };

    async GetUserProfile(req,res){
        try {
            const userId:string  = req.params.Id;
            const userService = new UserService();
            let authkeyData = await userService.GetAuthkeyDetail(req.headers.authkey)
           
            if(!validate(userId)){
                const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:422});
                res.status(500).json({error: result.errormessage});
            };
         
            const userData = await userService.LoadUser(userId);

            if(userData[0].userid == authkeyData.userid){
                const userMapper = new UserMapper();
                const mappedUser = userMapper.ModelToDto(userData);

                res.status(200).json(mappedUser[0]);
            }else{
                const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:4234});
                res.status(422).json({error: result.errormessage});
            }

            

        } catch (err) {
            new Logger().Error('GetUserProfile', err.toString(),  req.userId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    }

    async UpdatePassword(req,res){
        try {
            const userBody = req.body;

            const userService = new UserService();
            const userData = await userService.GetUserPasswordDetail(userBody.Id);
            const match =  await bcrypt.compare(userBody.CurrentPassword, userData.password);
            if (match) {
                const saltRounds = Number(config.saltKey);
                const hashedPassword = await bcrypt.hash(userBody.ChangePassword, saltRounds);
                userData.Password = hashedPassword;
                

                const userMapper = new UserMapper();
                const mappedUser = userMapper.ModelPassword(userData);
               
                const newUser = await userService.UpdateUser(mappedUser);

                res.status(200).json({"Id":newUser[0].userguid});
            }else{
                const result = await commonService.GetModelData(ErrorMessageModel,{statuscode:4235});
                res.status(422).json({error: result.errormessage});
            }
                       
        }catch (err) {
            await new Logger().Error('UpdatePassword', err.toString(),  req.userId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
            
        }
    }
}

    


>>>>>>> 00692b8b2c49accc5badc84488bfbee39dc216b5
