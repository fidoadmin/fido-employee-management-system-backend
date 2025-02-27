const Sequelize = require('sequelize');
var moment = require('moment');
const dbConnect = require('../connect/index');


export class PasswordChangeRequestService {
    async AddPasswordChangeRequest(userId: number) {
        const query = `SELECT * FROM insertpasswordchangerequest(:varuserid)`;
        const result = await dbConnect.query(query, {
            replacements: { varuserid:  userId },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };

    async UpdatePassword(varparams: any) {
        const query = `SELECT * FROM updatepassword(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams: JSON.stringify(varparams)  },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    };
}
