const dbConnect = require("../connect/index");
const Sequelize = require("sequelize");

export class PositionService {
  async GetPositions(varparams: unknown): Promise<any> {
    try {
      const query = `SELECT * FROM common.getpositions()`;
      const result = await dbConnect.query(query, {
        type: Sequelize.QueryTypes.SELECT,
      });

      console.log("Positions Fetched", result);
      if (result.length === 0) {
        console.warn("No Positions Found");
      }
      return result;
    } catch (error) {
      console.error("Error Fetching Positions", error);
      throw new Error("Error Fetching Positions");
    }
  }

  async UpsertPosition(positionData:any){
    try{
        const query = `SELECT * FROM common.upsertposition(:varjsondata)`;
        const result = await dbConnect.query((query),{
            replacements: { varjsondata: JSON.stringify(positionData) }, // Pass the department data as JSON
        type: Sequelize.QueryTypes.SELECT,
        })
        return result

    }
    catch(error){
        console.error("Error UpsertPosition",error)
        return({error:"Error Processing Postion related data"})
    }
  }


  async GetPosition(guid:string){
    const query = `SELECT * from common.getposition(:varguid)`
    const result = await dbConnect.query(query, {
      replacements: { varguid: guid },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }

  async DeletePosition(guid: string): Promise<boolean | null> {
    const query = `Select common.deleteposition(:varguid) AS result`;
const result = await dbConnect.query(query,{
  replacements:{varguid:guid},
  type:Sequelize.QueryTypes.SELECT,
})
return result


}
}
