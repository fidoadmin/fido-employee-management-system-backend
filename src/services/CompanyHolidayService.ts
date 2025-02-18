const dbConnect = require("../connect/index");
const Sequelize = require("sequelize");

export class CompanyHolidayService {
  async GetCompanyHoliday(varparams: any) {
    const query = `Select * FROM common.getcompanyholidays(:varjsonparams)`;
    const result = await dbConnect.query(query, {
      replacements: { varjsonparams: JSON.stringify(varparams) },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }

  async UpsertCompanyHoliday(calanderData:any){
    const query = `select * from common.upsertcompanyholiday(:varjsondata)`
    const result= await dbConnect.query(query,{
      replacements:{varjsondata:JSON.stringify(calanderData)},
      type:Sequelize.QueryTypes.SELECT
    })
    return result
  }

  async DeleteCompanyHoliday(id: string) {
    const query = `SELECT common.deletecompanyholiday(:vardepartmentid) AS result`;

    const result = await dbConnect.query(query, {
      replacements: { vardepartmentid: id },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }



}
