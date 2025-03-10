// import { Sequelize } from 'sequelize';
import { DepartmentModel } from "../models/Department";
const dbConnect = require("../connect/index");
const Sequelize = require("sequelize");
export class DepartmentService {

  async GetDepartments(varparams: any) {
    const { parentid, clientid } = varparams; 
  
    let query = `
      SELECT * 
      FROM common.getdepartments(:varjsonparams)
    `;
  
    let conditions = [];
    
    if (parentid !== null) {
      conditions.push("parentid IS NULL"); 
    }
    
    if (clientid) {
      conditions.push("clientid = :clientid"); 
    }
      if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }
      const result = await dbConnect.query(query, {
      replacements: {
        varjsonparams: JSON.stringify(varparams), 
        clientid: clientid ? clientid : null, 
      },
      type: Sequelize.QueryTypes.SELECT,
    });
  
    return result;
  }
  
  
  
  

async UpsertDepartment(departmentData: any) {
    const query = `SELECT * FROM common.upsertdepartment(:varjsondata)`;
    const result = await dbConnect.query(query, {
      replacements: { varjsondata: JSON.stringify(departmentData) },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }
  
async DeleteDepartment(id: string) {
    const query = `SELECT common.deletedepartment(:vardepartmentid) AS result`;

    const result = await dbConnect.query(query, {
      replacements: { vardepartmentid: id },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }
} 
