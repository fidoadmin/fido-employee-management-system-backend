const Sequelize = require('sequelize');
const dbConnect = require('../connect/index');


export class AuthenticationService {

    async UpsertLogin(loginData:any) {
       
        const query = `SELECT * FROM common.upsertuserlogininfo(:varlogin)`;
        const result = await dbConnect.query(query, {
            replacements: { varlogin: JSON.stringify(loginData) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result[0];
    }
}