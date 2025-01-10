const dbConnect = require("../connect/index");
const Sequelize = require("sequelize");
import CompanyModel from "../models/Company";

export class CompanyService {
  async GetCompanies(): Promise<any> {

      const query = `Select * FROM common.getcompanies()`;
      const result = await dbConnect.query(query, {
        // replacements:{varparams},
        type: Sequelize.QueryTypes.SELECT,
      });
      return result
   
  }

  async GetCompany(guid: string) {
    const query = `SELECT * FROM common.getcompany(:varguid)`;
    const result = await dbConnect.query(query, {
      replacements: { varguid: guid },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }

  async DeleteCompany(guid: string): Promise<boolean | null> {
    const query = `SELECT common.deletecompany(:varcompanyguid) AS result`;

      const result = await dbConnect.query(query, {
        replacements: { varcompanyguid: guid },
        type: Sequelize.QueryTypes.SELECT,

      });
      return result
  }

  async UpsertCompany(companyData:any){
    const query = `SELECT * from common.upsertcompany(:varjsondata)`
    const result = await dbConnect.query(query,{
      replacements:{varjsondata:JSON.stringify(companyData)},
      type:Sequelize.QueryTypes.SELECT
    })
    return result
  }
}