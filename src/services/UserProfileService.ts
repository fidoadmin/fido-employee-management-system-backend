const dbConnect = require("../connect/index");
const Sequelize = require("sequelize");

export class UserProfileService {
  async GetUserProfile(varparams: string) {
    const query = `SELECT * FROM common.getuserprofile(:varparams);`;
    const result = await dbConnect.query(query, {
      replacements: { varparams }, // Pass the string directly
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }
}
