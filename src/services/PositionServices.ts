const dbConnect = require("../connect/index");
const Sequelize = require("sequelize");

export class PositionService {
  async GetPositions(varparams: any) {
    const query = `SELECT * FROM common.getpositions(:varjsonparams);`;
    const result = await dbConnect.query(query, {
      replacements: { varjsonparams: JSON.stringify(varparams) },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }

  async UpsertPosition(positionData: any) {
    const query = `SELECT * FROM common.upsertposition(:varjsondata)`;
    const result = await dbConnect.query(query, {
      replacements: { varjsondata: JSON.stringify(positionData) },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }

  async DeletePosition(id: string) {
    const query = `SELECT common.deleteposition(:varpositionid) AS result`;

    const result = await dbConnect.query(query, {
      replacements: { varpositionid: id },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }
}
  