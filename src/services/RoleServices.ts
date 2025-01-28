const dbConnect = require("../connect/index");
import Sequelize = require("sequelize");

export class RoleService {
  async GetRoles(varparams: any): Promise<any> {
    const query = `Select * from common.getroles(:varjsonparams)`;
    const result = await dbConnect.query(query, {
      replacements: { varjsonparams: JSON.stringify(varparams) },

      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }

  async UpsertRole(roleData: any) {
    const query = `SELECT * from common.upsertrole(:varjsondata)`;
    const result = await dbConnect.query(query, {
      replacements: { varjsondata: JSON.stringify(roleData)  },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }

  async DeleteRole(id: string) {
    const query = `SELECT common.deleterole(:varroleid) AS result`;

    const result = await dbConnect.query(query, {
      replacements: { varroleid: id },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }


}
 