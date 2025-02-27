const Sequelize = require('sequelize');
const dbConnect = require('../connect/index');

export class CompanyService {

    async LoadCompanies(params) {
        const query = `SELECT * FROM common.getcompanies(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams:JSON.stringify(params) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async UpsertCompany(companyData) {
        const query = `SELECT * FROM common.upsertcompany(:varjsondata)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsondata :JSON.stringify(companyData) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async DeleteCompany(companyGUID) {
        const query = `SELECT common.deletecompany(:varcompanyguid)`;
        const result = await dbConnect.query(query, {
            replacements: { varcompanyguid : companyGUID },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async GetCompany(id) {
        const query = `SELECT * FROM  common.getcompany(:varcompanyid)`;
        const result = await dbConnect.query(query, {
            replacements: { varcompanyid :id },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
   };
}
