const Sequelize = require('sequelize');
const moment = require('moment');
const dbConnect = require('../connect/index');



export class DashboardService {

    async LoadDashboard() {
        const query = `SELECT * FROM getdashboard()`;
        const result = await dbConnect.query(query, {
            replacements: { },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

   

    
}
