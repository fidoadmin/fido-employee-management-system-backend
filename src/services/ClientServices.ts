const dbConnect = require("../connect/index")
const Sequelize = require("sequelize")


export class ClientService{
    async GetClients():Promise<any> {
        const query =`Select * FROM common.clients()`;
        const result = await dbConnect.query(query,{
            type:Sequelize.QueryTypes.SELECT,

        })
        return result
    }
    async GetClient(guid:string){
        const query = `select * from common.client(:varguid)`;
        const result = await dbConnect.query(query,{
         replacements:{varguid:guid},
         type:Sequelize.QueryTypes.SELECT,
        })
        return result
    }


    async DeleteClient(guid: string): Promise<boolean | null> {
        const query = `SELECT common.deleteclient(:varclientguid) AS result`;
    
          const result = await dbConnect.query(query, {
            replacements: { varclientguid: guid },
            type: Sequelize.QueryTypes.SELECT,
    
          });
          return result
      }
    

      async UpsertClient(clientData:any){
        const query= `SELECT * from common.upsertclient(:varjsondata)`
        const result = await dbConnect.query(query,{
            replacements :{varjsondata:JSON.stringify(clientData)},
            type:Sequelize.QueryTypes.SELECT
        })
        return result
      }

}