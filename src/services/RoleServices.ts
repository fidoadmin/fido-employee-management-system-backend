const dbConnect = require('../connect/index')
import Sequelize = require("sequelize")

export class RoleService{
    async GetRoles(varparams:unknown) : Promise<any>{

        const query =`Select * from common.getroles()`;
        const result = await dbConnect.query(query,{
            type:Sequelize.QueryTypes.SELECT
        });
        return result
    }
    
    async GetRole(guid: string) {
        const query = `SELECT * FROM common.getRole(:varguid)`;
        const result = await dbConnect.query(query, {
          replacements: { varguid: guid },
          type: Sequelize.QueryTypes.SELECT,
        });
        return result;
      }
    
      async DeleteRole(guid: string): Promise<boolean | null> {
        const query = `SELECT common.deleterole(:varroleguid) AS result`;
    
          const result = await dbConnect.query(query, {
            replacements: { varroleguid: guid },
            type: Sequelize.QueryTypes.SELECT,
    
          });
          return result
    
    
      }
    
      async UpsertRole(roleData:any){
        const query = `SELECT * from common.upsertrole(:varjsondata)`
        const result = await dbConnect.query(query,{
          replacements:{varjsondata:JSON.stringify(roleData)},
          type:Sequelize.QueryTypes.SELECT
        })
        return result
      }
}
