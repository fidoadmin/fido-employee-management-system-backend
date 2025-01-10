import { PositionService } from "./../services/PositionServices";
import { PositionMapper } from "../mapper/PositionMapper";
import { Request, Response } from "express";

export class PositionController {
  static GetPositions: any;
  async GetPositions(req: Request, res: Response): Promise<void> {
    try {
      const page = req.query.Page ? parseInt(req.query.Page as string, 10) : 1; // Default to page 1
      const limit = req.query.Limit
        ? parseInt(req.query.Limit as string, 10)
        : 10; // Default to 10 items per page
      const companyId = req.query.CompanyId ? req.query.CompanyId : null;
      const isEntryPoint = req.query.IsEntryPoint
        ? req.query.IsEntryPoint === "true"
        : null;
      const pageOffset = (page - 1) * limit;
      const pageLimit = limit;

      // Additional parameters
      const varparams = {
        pageOffset: pageOffset,
        pageLimit: pageLimit,
        search: req.query.varsearch ? req.query.varsearch.toString() : "",
        sortBy: req.query.varsortby ? req.query.varsortby.toString() : "name",
        sortOrder: req.query.varsortorder
          ? req.query.varsortorder.toString().toUpperCase()
          : "ASC",
        companyGuid: companyId,
        isEntryPoint: isEntryPoint,
      };

      const positionService = new PositionService();
      const positions = await positionService.GetPositions(varparams);

      if (positions.length === 0) {
        res.status(404).json({ Message: "No positions " });
      }
      res.status(200).json(positions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ Error: "Internal Server Error" });
    }
  }

  async GetPosition(req: Request, res: Response): Promise<void> {
    try {
      const positionID = req.params.guid;
  
      // Validate the GUID parameter
      if (!positionID) {
        res.status(400).json({ message: "Guid is required" });
        return;
      }
  
 
  
      // Fetch position data
      const positionService = new PositionService();
      const positionData = await positionService.GetPosition(positionID);
      console.log(positionData)
  
      // Check if positionData is valid
      if (positionData === null || positionData === undefined) {
        res.status(404).json({ message: "Position not found" });
        return;
      }
  
      // Map the data to the DTO
      const positionMapper = new PositionMapper();
      const mappedPosition = positionMapper.ModelToDto(positionData);
  
      // Send the response
      res.status(200).json(mappedPosition);
    } catch (error) {
      console.error("Error in GetDepartment:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  

  // async GetDepartment(req:Request,res:Response):Promise<void>{
  //   const Position GUID =
  // }

  async UpsertPosition(req: Request, res: Response): Promise<any> {
    try {
      const positionData = req.body;
      console.log(positionData);

      if (!positionData.Name) {
        res.status(422).json({ error: "Position Name is required" });
        return;
      }

      const positionService = new PositionService();
      const positionMapper = new PositionMapper();
      const mappedPosition = positionMapper.DtoToModel(positionData);

      const result = await positionService.UpsertPosition(mappedPosition);

      // Check if result is undefined or error exists in result
      if (!result) {
        console.error("Error: No result returned from UpsertPosition");
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Handle different result scenarios (error or success)
      if (result.error) {
        res.status(400).json(result); // Return error response
      } else {
        res.status(200).json(result); // Return success response with the result
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async DeletePosition(req: Request, res: Response): Promise<void> {
    try {
      const positionGUID = req.params.guid;
      console.log(positionGUID);
      const positionService = new PositionService();

      const result = await positionService.DeletePosition(positionGUID);
      if (result) {
        res.status(200).json({ message: "Position deleted successfully" });
      } else {
        res.status(404).json({ message: "Position not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }



}
