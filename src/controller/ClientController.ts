import { ClientMapper } from "./../mapper/ClientMapper";
import { ClientService } from "../services/ClientServices";
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

      const clientMapper = new ClientMapper();
      const mappedClient = clientMapper.ModelToDto(clients);

      return res.status(200).json(mappedClient);
      
    } catch (error) {
      new Logger().Error("Get Clients",error.toString(),req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
      return  res.status(500).json(result.errormessage)
    }
  }

  async UpsertClient(req, res) {
    try {
      const clientData = req.body;

      const clientMapper = new ClientMapper();
      const mappedClient = clientMapper.DtoToModel(clientData);

      const clientService = new ClientService();
      const result = await clientService.UpsertClient(mappedClient);

      if (result[0].result == "Duplicate code") {
        const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4092, });
        return res.status(409).json({ error: result.errormessage });
      }

      return res.status(200).json(result);
    }catch (error) {
      new Logger().Error("Upsersert Client",error.toString(),req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
      return res.status(500).json(result.errormessage)
     }
  }

  async DeleteClient(req, res) {
    try {
      const clientId = req.params.id;
      const isGuid: boolean = await commonService.isUUID(clientId);

      if (!isGuid) {
        const result = await commonService.GetModelData(ErrorMessageModel, {statuscode: 404,});
        return res.status(404).json(result.errormessage);
      }

      const departmentService = new ClientService();
      const result = await departmentService.DeleteClient(clientId);

      return res.status(200).json();
    } catch (error) {
      new Logger().Error("Delete Client",error.toString(),req.clientId, req.userId);
      const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500,});
      return res.status(500).json(result.errormessage)
     }
  }
}
