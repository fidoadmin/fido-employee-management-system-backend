const Sequelize = require('sequelize');
var moment = require('moment');
const dbConnect = require('../connect/index');

export class ClientService {

    async LoadClients(varparams: any) {
        const query = `SELECT * FROM common.getclients(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams:  JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

    async UpsertClient(upsertData: any) {
        const query = `SELECT * FROM common.upsertclient(:varjsondata)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsondata: JSON.stringify(upsertData) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

    
  
}
