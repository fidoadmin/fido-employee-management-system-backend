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
      const positionMapper = new PositionMapper();
      const positions = await positionService.GetPositions(varparams);
      const mappedPosition = positionMapper.ModelToDto(positions);

      if (positions.length === 0) {
        res.status(404).json({ Message: "No positions " });
      }
      res.status(200).json(mappedPosition);
    } catch (err) {
      await new Logger().Error("GetDepartments", err.toString(), 1, 1);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });

      res.status(500).json({ error: result.errormessage });
    }
  }

  async UpsertPosition(req, res) {
    try {
      const positionData = req.body;

      const positionService = new PositionService();
      const positionMapper = new PositionMapper();
      const mappedPosition = positionMapper.DtoToModel(positionData);

      const result = await positionService.UpsertPosition(mappedPosition);

      // Check if result is undefined or error exists in result

      res.status(200).json({ Id: result });
    } catch (err) {
      new Logger().Error("Upsersert Department", err.toString(), 1, 2);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });
      res.status(500).json({ error: result.errormessage });
    }
  }

  async DeletePosition(req, res) {
    try {
      const positionGUID = req.params.id;
      const isGuid: boolean = await commonService.isUUID(positionGUID);
      if (!isGuid) {
        const result = await commonService.GetModelData(ErrorMessageModel, {
          statuscode: 500,
        });
        console.log(result);
        res.status(500).json({ error: result.errormessage });
      }
      const positionService = new PositionService();

      const result = await positionService.DeletePosition(positionGUID);
      res.status(200).json(result);
    } catch (err) {
      new Logger().Error("DeleteDepartment", err.toString(), 1, 1);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });
      res.status(500).json({ error: result.errormessage });
    }
  }
}
