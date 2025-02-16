const dbConnect = require("../connect/index");
const Sequelize = require("sequelize");

export class ClientService {
  async GetClients(varparams: any) {
    const query = `Select * FROM common.getclients(:varjsonparams)`;
    const result = await dbConnect.query(query, {
      replacements: { varjsonparams: JSON.stringify(varparams) },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }
  async UpsertClient(clientData: any) {
    const query = `SELECT * from common.upsertclient(:varjsondata)`;
    const result = await dbConnect.query(query, {
      replacements: { varjsondata: JSON.stringify(clientData) },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }
  async DeleteClient(guid: string) {
    const query = `SELECT common.deleteclient(:varclientguid) `;

    const result = await dbConnect.query(query, {
      replacements: { varclientguid: guid },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }


}
