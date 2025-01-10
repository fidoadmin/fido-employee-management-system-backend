// import { Sequelize } from 'sequelize';
import { DepartmentModel } from "../models/Department";
const dbConnect = require("../connect/index");
const Sequelize = require("sequelize");
export class DepartmentService {
  async GetAllDepartments(varparams: any): Promise<any> {
    const query = `SELECT * FROM common.getdepartments(:varjsonparams);`;
    const result = await dbConnect.query(query, {
      replacements: { varjsonparams:  JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }

  async GetDepartment(guid: string) {
    const query = `SELECT * FROM common.getdepartment(:varguid)`;
    const result = await dbConnect.query(query, {
      replacements: { varguid: guid },
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

  async DeleteDepartment(guid: string): Promise<boolean | null> {
    const query = `SELECT common.deletedepartment(:vardepartmentguid) AS result`;

    const result = await dbConnect.query(query, {
      replacements: { vardepartmentguid: guid },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }
}
