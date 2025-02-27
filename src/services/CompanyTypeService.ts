const Sequelize = require('sequelize');
var moment = require('moment');
const dbConnect = require('../connect/index');

export class CompanyTypeService {

    async LoadCompanyTypes(varparams: any) {
        const query = `SELECT * FROM common.getcompanytypes(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams:  JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }
  
}
