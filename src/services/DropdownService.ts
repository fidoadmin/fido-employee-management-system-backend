const Sequelize = require("sequelize");
const dbConnect = require("../connect/index");

export class DropdownService {
    async LoadDropdownList(varparams: any) {
      const query = `SELECT * FROM common.getdropdownlist(:varparams)`;
      const result = await dbConnect.query(query, {
        replacements: { varparams: JSON.stringify(varparams) },  
        type: Sequelize.QueryTypes.SELECT,
      });
      return result;
    }
  }