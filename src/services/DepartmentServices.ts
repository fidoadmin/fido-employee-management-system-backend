// import { Sequelize } from 'sequelize';
import { DepartmentModel } from "../models/Department";
const dbConnect = require("../connect/index");
const Sequelize = require("sequelize");
export class DepartmentService {

async GetDepartments(varparams: any) {
    const query = `SELECT * FROM common.getdepartments(:varjsonparams);`;
    const result = await dbConnect.query(query, {
      replacements: { varjsonparams: JSON.stringify(varparams) },
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
