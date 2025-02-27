const Sequelize = require('sequelize');
var moment = require('moment');
const dbConnect = require('../connect/index');



export class BranchService {
    async LoadBranches(varparams: any) {
        const query = `SELECT * FROM common.getbranches(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams:  JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

    async UpsertBranch(branchData: any) {
        const query = `SELECT * FROM common.upsertbranch(:varjsondata)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsondata: JSON.stringify(branchData) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

    async DeleteBranch(branchguid: string) {
        const query = `SELECT common.deletebranch(:varbranchguid)`;
        const result = await dbConnect.query(query, {
            replacements: { varbranchguid : branchguid },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

   
}
