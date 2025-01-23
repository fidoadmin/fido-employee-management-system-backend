import { ClientMapper } from "./../mapper/ClientMapper";
import { ClientService } from "../services/ClientServices";
import { Request, Response } from "express";
import { Logger } from "../logger/logger";
import { ErrorMessageModel } from "../models/ErrorMessages";
import { CommonService } from "../common/common";
const commonService = new CommonService();

export class ClientController {
  async GetClients(req, res) {
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

      const clientService = new ClientService();
      const clients = await clientService.GetClients(varparams);

      const totalCount = clients.length > 0 ? clients[0].total : 0;
      res.header("X-Page-TotalCount", totalCount.toString());

      if (clients.length === 0) {
        res.status(404).json({ Message: "No clients" });
        return;
      }
      const clientMapper = new ClientMapper();
      const mappedClient = clientMapper.ModelToDto(clients);
      res.status(200).json(mappedClient);
    } catch (err) {
      await new Logger().Error("GetDepartments", err.toString(), 1, 1);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });

      res.status(500).json({ error: result.errormessage });
    }
  }

  async UpsertClient(req: Request, res: Response): Promise<void> {
    try {
      const clientData = req.body;
 
      const clientService = new ClientService();
      const clientMapper = new ClientMapper();
      const mappedClient = clientMapper.DtoToModel(clientData);
      const result = await clientService.UpsertClient(mappedClient);

      // Handle different result scenarios (error or success)
      res.status(200).json({ Id: result });
    } catch (error) {
      new Logger().Error("Upsersert Department", error.toString(), 1, 2);
      const result = await commonService.GetModelData(ErrorMessageModel, {
        statuscode: 500,
      });
      res.status(500).json({ error: result.errormessage });
    }
  }

    async DeleteClient(req, res) {
      try {
        const clientId = req.params.id;
        const isGuid: boolean = await commonService.isUUID(clientId);
        if (!isGuid) {
          const result = await commonService.GetModelData(ErrorMessageModel, {
            statuscode: 500,
          });
          console.log(result)
          res.status(500).json({ error: result.errormessage });
        }
        const departmentService = new ClientService();
        const result = await departmentService.DeleteClient(clientId);
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
