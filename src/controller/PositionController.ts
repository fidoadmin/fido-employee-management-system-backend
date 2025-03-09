import { PositionService } from "./../services/PositionServices";
import { PositionMapper } from "../mapper/PositionMapper";
import { Logger } from "../logger/logger";
import { ErrorMessageModel } from "../models/ErrorMessages";
import { CommonService } from "../common/common";
const commonService = new CommonService();

export class PositionController {

   async GetPositions(req, res) {
  
      try {
        const page = req.query.Page ? req.query.Page : 1;
        const limit = req.query.Limit ? req.query.Limit : 10;
        const pageOffset = (page - 1) * limit;
        const pageLimit = limit;
        const varparams: any = {
          pageOffset,
          pagelimit: pageLimit,
          sortBy: req.query.varsortby ? req.query.varsortby : "name",
          sortOrder: req.query.varsortorder ? req.query.varsortorder : "asc",
          search: req.query.varsearch ? req.query.varsearch : "",
        };
  
        const positionService = new PositionService();
        const positions = await positionService.GetPositions(varparams);
  
        const totalCount = positions.length > 0 ? positions[0].total :0;
        res.header("X-Page-TotalCount", totalCount.toString());
        
        const clientMapper = new PositionMapper();
        const mappedClient = clientMapper.ModelToDto(positions);
  
        return res.status(200).json(mappedClient);
        
      } catch (err) {
        await new Logger().Error("GetPosition", err.toString(), req.clientId, req.userId);
        const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 500,});
        return res.status(500).json( result.errormessage );
      }
    }

  async UpsertPosition(req, res) {
    try {
      const positionData = req.body;
      if (!positionData.Name || positionData.Name.trim() === "") {
        const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4250 });
        return res.status(400).json({ error: result.errormessage });
      }
      
      if (!positionData.Code || positionData.Code.trim() === "") {
        const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4252 });
        return res.status(400).json({ error: result.errormessage });
      }

      const positionMapper = new PositionMapper();
      const mappedPosition = positionMapper.DtoToModel(positionData);
      
      const positionService = new PositionService();
      const result = await positionService.UpsertPosition(mappedPosition);

      if (result[0].result == "Duplicate code") {
        const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4092,});
        return res.status(409).json( {error:result.errormessage});    
     }

      return res.status(200).json(result);

    } catch (err) {
      await new Logger().Error("Upsert Position", err.toString(), req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 500,});
      return res.status(500).json( result.errormessage );
    }
  }

  async DeletePosition(req, res) {
    try {
      const positionGUID = req.params.Id;
      const isGuid: boolean = await commonService.isUUID(positionGUID);

      if (!isGuid) {
        const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 404,});
        res.status(404).json( result.errormessage );
      }

      const positionService = new PositionService();
      const result = await positionService.DeletePosition(positionGUID);

      if (result[0].result == "Already in use") {
        const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 4231,});
        return res.status(409).json( {error:result.errormessage});
      }

      return res.status(200).json(result);
      
    } catch (err) {
      await new Logger().Error("Delete Position", err.toString(), req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 500,});
      return res.status(500).json( result.errormessage );
    }

  }
}
