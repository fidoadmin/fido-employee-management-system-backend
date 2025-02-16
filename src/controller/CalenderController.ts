import { CalendarMapper } from './../mapper/CalenderMapper';
import { ClientMapper } from "./../mapper/ClientMapper";
import { ClientService } from "../services/ClientServices";
import { Logger } from "../logger/logger";
import { ErrorMessageModel } from "../models/ErrorMessages";
import { CommonService } from "../common/common";
import { CalenderService } from "../services/CalenderService";
const commonService = new CommonService();

export class CalenderController {

  async GetCalenderSpecific(req,res){
    try {
      // Access query parameters directly from req.query
      const { nepyear, nepmonth } = req.query;
      if (!nepyear || !nepmonth) {
         res.status(400).json({ message: "Nepali year and month are required" });
         return;
      }''
    
      const year = nepyear ? Number(nepyear) : 2081; 
      const month = nepmonth ? Number(nepmonth) : new Date().getMonth() + 1; 
  
      const calenderService = new CalenderService();
      const calender = await calenderService.GetCalenderSpecific({ nepyear: year, nepmonth: month });
      
      if (calender.length === 0) {
        res.status(404).json({ message: "No calendar entries found" });
        return;
      }
  
      res.status(200).json(calender);
    } catch (error) {
          new Logger().Error("Get Calander",error.toString(),req.clientId, req.userId);
          const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
          res.status(500).json(result.errormessage)
         }
  }


  async GetCalender(req, res) {
    try {
        // Access query parameters directly from req.query
        const { nepyear, nepmonth } = req.query;
        if (!nepyear || !nepmonth) {
           res.status(400).json({ message: "Nepali year and month are required" });
           return;
             }''
      
        const year = nepyear ? Number(nepyear) : 2081; 
        const month = nepmonth ? Number(nepmonth) : new Date().getMonth() + 1; 
    
        const calenderService = new CalenderService();
        const calender = await calenderService.GetCalender({ nepyear: year, nepmonth: month });
        
        const calenderMapper = new CalendarMapper()
        const mappedCalender = calenderMapper.ModelToDto(calender)
    
        res.status(200).json(mappedCalender);
      } catch (error) {
            new Logger().Error("Get Calander",error.toString(),req.clientId, req.userId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
            res.status(500).json(result.errormessage)
           }
    }

    async UpdateCalander(req,res): Promise<void> {
        try{
          const calanderData=req.body
          if (!calanderData.id){
            res.status(422).json({error:"Id is required"})
          }
          const calanderService = new CalenderService()
          const result=await calanderService.UpdateCalender(calanderData)
          if (!result) {
            console.error("Error: Cannot update calander");
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          return res.status(200).json(result);
        }
        catch(error){
              new Logger().Error("Upsersert Calender",error.toString(),req.clientId, req.userId);
              const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
              res.status(500).json(result.errormessage)
             }
        }
        
}
