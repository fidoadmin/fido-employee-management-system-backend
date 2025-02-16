const dbConnect = require('../connect/index')
const Sequelize = require('sequelize')

export  class LeaveTypeService{

    async GetLeaveTypes(varparams:any){
        const query = `SELECT * from common.getleavetypes(:varjsonparams)`
        const result = await dbConnect.query(query,{
            replacements:{varjsonparams:JSON.stringify(varparams)},
            type:Sequelize.QueryTypes.SELECT
        });
        return result
    }

    async UpsertLeaveType(leaveTypeData:any){
        const query =`SELECT * from common.upsertleavetype(:varjsondata)`
        const result = await dbConnect.query(query,{
            replacements:{varjsondata:JSON.stringify(leaveTypeData)},
            type:Sequelize.QueryTypes.SELECT
        })
        return result
    }

    async DeleteLeaveType(guid:string){
        const query =`SELECT common.deleteleavetype(:varleavetypeguid) as result`
        const result = await dbConnect.query(query,{
            replacements:{varleavetypeguid:guid},
            type:Sequelize.QueryTypes.SELECT,
        })
        return result
    }
}