const dbConnect = require("../connect/index");
const Sequelize = require("sequelize");

export class CalenderService {

  async GetCalenderSpecific(varparams:any){
    const query = `
     SELECT nepyear, nepmonth, nepday, parwa, events
     FROM public.calender
     WHERE nepyear = :nepyear 
     AND nepmonth = :nepmonth
     AND deleted IS NULL
     ORDER BY nepmonth, nepday, nepyear

    `;    
  const result = await dbConnect.query(query, {
      replacements: { nepyear: varparams.nepyear, nepmonth: varparams.nepmonth },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }

  async GetCalender(varparams: any) {
    const query = `
   SELECT * 
   FROM public.calender 
    WHERE nepyear = :nepyear 
    AND nepmonth = :nepmonth 
   AND deleted IS NULL
   ORDER BY nepmonth, nepday, nepyear
  `  
  const result = await dbConnect.query(query, {
      replacements: { nepyear: varparams.nepyear, nepmonth: varparams.nepmonth },
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  }

  async UpdateCalender(calanderData:any){
    const query = `select * from public.updatecalander(:varjsondata)`
    const result= await dbConnect.query(query,{
      replacements:{varjsondata:JSON.stringify(calanderData)},
      type:Sequelize.QueryTypes.SELECT
    })
    return result
  }



}
