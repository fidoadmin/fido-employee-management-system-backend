const dbConnect = require("../connect/index");
const Sequelize = require("sequelize");
export class LeaveService {
  async GetLeaves(varparams: any) {
    const query = `
     SELECT * FROM public.getleaves(:varjsonparams)`;
     const result = await dbConnect.query(query, {
     replacements: {
       varjsonparams: JSON.stringify(varparams),
        },
      type: Sequelize.QueryTypes.SELECT,
    });

    return result;
  }

  async UpsertLeave(leaveData: any) {
    const query = `SELECT * FROM public.upsertLeave(:varjsondata)`;
    const result = await dbConnect.query(query, {
      replacements: { 
       varjsondata: JSON.stringify(leaveData) },
       type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }

  async DeleteLeave(id: string) {
    const query = `SELECT common.deleteLeave(:varleaveid) AS result`;
    const result = await dbConnect.query(query, {
      replacements: { varleaveid: id },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }
}
