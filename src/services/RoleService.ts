const Sequelize = require('sequelize');
const dbConnect = require('../connect/index');

export class RoleService {

    async LoadRoles(varparams: any) {
        const query = `SELECT * FROM common.getroles(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams:  JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

    async UpsertRole(roleData: any) {
        const query = `SELECT * FROM common.upsertrole(:varjsondata)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsondata: JSON.stringify(roleData) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

    async DeleteRole(roleguid: string) {
        const query = `SELECT common.deleterole(:varroleguid)`;
        const result = await dbConnect.query(query, {
            replacements: { varroleguid : roleguid },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

   
}
