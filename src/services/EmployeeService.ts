// import { Sequelize } from 'sequelize';
const dbConnect = require("../connect/index");
const Sequelize = require("sequelize");
export class EmployeeService {

async GetEmployees(varparams: any) {
    const query = `SELECT * FROM common.getusers(:varjsonparams);`;
    const result = await dbConnect.query(query, {
      replacements: { varjsonparams: JSON.stringify(varparams) },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }

async UpsertEmployee(departmentData: any) {
    const query = `SELECT * FROM common.upsertemployee(:varjsondata)`;
    const result = await dbConnect.query(query, {
      replacements: { varjsondata: JSON.stringify(departmentData) },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }
  
async DeleteEmployee(id: string) {
    const query = `SELECT common.deleteemployee(:varemployeeguid) AS result`;

    const result = await dbConnect.query(query, {
      replacements: { varemployeeguid: id },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }
  
} 
