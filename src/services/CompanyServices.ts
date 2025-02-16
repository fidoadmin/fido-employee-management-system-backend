const dbConnect = require("../connect/index");
const Sequelize = require("sequelize");
import CompanyModel from "../models/Company";

export class CompanyService {
  async GetCompanies(varparams: any) {
    const query = `Select * FROM common.getcompanies(:varjsonparams)`;
    const result = await dbConnect.query(query, {
      replacements: { varjsonparams: JSON.stringify(varparams) },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }

  async UpsertCompany(companyData: any) {
    const query = `SELECT * from common.upsertcompanies(:varjsondata)`;
    const result = await dbConnect.query(query, {
      replacements: { varjsondata: JSON.stringify(companyData) },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }

  async DeleteCompany(guid: string) {
    const query = `SELECT common.deletecompany(:varcompanyguid) AS result`;

    const result = await dbConnect.query(query, {
      replacements: { varcompanyguid: guid },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }
}
