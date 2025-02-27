const Sequelize = require('sequelize');
const moment = require('moment');
const dbConnect = require('../connect/index');


export class ReportService {
    async GetReport(varparams: any) {
        const query = `SELECT * FROM report(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams: JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };
}
