const dbConnect = require("../connect/index");
const Sequelize = require("sequelize");

export class LeaveStatusService {
  async GetLeaveStatus() {
    const query = `SELECT guid, name, code,created,deleted FROM public.status where deleted is null;`;
    const result = await dbConnect.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }
}
