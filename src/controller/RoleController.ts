import {  RoleService } from './../services/RoleServices';
import { RoleMapper } from "../mapper/RoleMapper";
import { Request,Response } from "express";
import { PositionMapper } from '../mapper/PositionMapper';

export class RoleController{
    static GetRole:any;
    
    async GetRoles(req:Request,res:Response):Promise<void>{
        try{
            const page = req.query.Page ? parseInt(req.query.Page as string, 10) : 1; // Default to page 1
            const limit = req.query.Limit
              ? parseInt(req.query.Limit as string, 10)
              : 10; // Default to 10 items per page
            const companyId = req.query.CompanyId ? req.query.CompanyId : null;
            const isEntryPoint = req.query.IsEntryPoint
              ? req.query.IsEntryPoint === "true"
              : null;
            const pageOffset = (page - 1) * limit;
            const pageLimit = limit;
      
            // Additional parameters
            const varparams = {
              pageOffset: pageOffset,
              pageLimit: pageLimit,
              search: req.query.varsearch ? req.query.varsearch.toString() : "",
              sortBy: req.query.varsortby ? req.query.varsortby.toString() : "name",
              sortOrder: req.query.varsortorder
                ? req.query.varsortorder.toString().toUpperCase()
                : "ASC",
              companyGuid: companyId,
              isEntryPoint: isEntryPoint,
            }; 

            const roleService  = new RoleService()
            const roles = await roleService.GetRoles(varparams)
            if(roles.length===0){
                res.status(404).json({Message:"No Positionos"});
            }
            res.status(200).json(roles)

        }
    catch(error){
        console.error(error);
        res.status(500).json({Error:"Internal Server Error"})
    }
    }

    async UpsertRole(req:Request,res:Response):Promise<void>{
        try{
            const roleData = req.body
            console.log(roleData)
            if(!roleData.Name){
                res.status(422).json({error:"Role Name Is required"})
                return
            }
            const roleService = new RoleService()
            const roleMapper = new RoleMapper()
            const mappedRole =  roleMapper.DtoToModel(roleData)
            const result = await roleService.UpsertRole(mappedRole)


            if (result.error) {
                res.status(400).json(result); // Return error response
              } else {
                res.status(200).json(result); // Return success response with the result
              }

        }
        catch(error){
            console.error(error)
            res.status(500).json({ error: "Internal Server Error" });
        }

    }


async GetRole(req:Request,res:Response):Promise<void>{
    try{
        const roleID = req.params.guid;
        if(!roleID){
            res.status(400).json({message:"Guid is required"});
            return
        }
        const roleService = new RoleService()
        const roleData = roleService.GetRole(roleID)
        if(!roleData===null){
            res.status(404).json({message:"no position fond"})
            return
        }

const positionMapper = new PositionMapper()
const mappedPosition =positionMapper.ModelToDto(await roleData)


        res.status(200).json(mappedPosition)
    }
    catch(error){
        console.error(error,"Error in GetRole")
        res.status(500).json({message:"Internal Server Error"})
    }
}

async DeleteRole(req:Request,res:Response):Promise<void>{
    try{
        const roleGUID=req.params.guid
        console.log(roleGUID)
        const roleService = new RoleService()
        const result = await roleService.DeleteRole(roleGUID)
        if(result){
            res.status(200).json({message:"Role deleted Successfully"})

        }
        else{
            res.status(404).json({message:"Role not found"})
        }

    }
    catch(error){
    console.error(error)
    res.status(500).json({error:"internal server error"})
    }

}


    
}