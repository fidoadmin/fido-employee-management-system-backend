import { ClientMapper } from "../mapper/ClientMapper";
import { ClientService } from "../services/ClientServices";
import { Request, Response } from "express";

export class ClientController {
  async GetClients(req: Request, res: Response): Promise<void> {
    try {
      const clientService = new ClientService();
      const clients = await clientService.GetClients();
      if (clients.length === 0) {
        res.status(404).json({ Message: "No clients" });
        return;
      }
      res.status(200).json(clients);
    } catch (err) {
      console.error(err);
      res.status(500).json("Internal Server Error");
    }
  }

  async GetClient(req: Request, res: Response): Promise<void> {
    try {
      const clientGUID = req.params.guid;
      if (!clientGUID || clientGUID.trim() === "") {
        res.status(400).json({ message: "Guid is required" });
        return;
      }

      const clientService = new ClientService();
      const clientData = await clientService.GetClient(clientGUID);

      if (!clientData) {
        res.status(404).json({ message: "Clinets not found" });
        return;
      }

      const clientMapper = new ClientMapper();
      const mappedClient = clientMapper.ModelToDto(clientData);
      res.status(200).json(mappedClient);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ Message: "Internal Server Error from GET client" });
    }
  }

  async UpsertClient(req:Request,res:Response):Promise<void>{
    try{
      const clientData =req.body
      if (!clientData.Name) {
        res.status(422).json({ error: "Client Name is required" });
        return;
      }
      const clientService = new ClientService()
      const clientMapper = new ClientMapper()
      const mappedClient = clientMapper.DtoToModel(clientData);
      const result = await clientService.UpsertClient(mappedClient)
      if (!result) {
        console.error("Error: No result returned from upsertClient");
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Handle different result scenarios (error or success)
      if (result.error) {
        res.status(400).json(result); // Return error response
      } else {
        res.status(200).json(result); // Return success response with the result
      }
      
    }
    catch(error){
      console.error(error)
      res.status(500).json("Internal Server Error from UpsertCLient")
    }
  }



  async DeleteClient(req: Request, res: Response): Promise<void> {
    try {
      const positionGUID = req.params.guid;
      console.log(positionGUID);
      const positionService = new ClientService();

      const result = await positionService.DeleteClient(positionGUID);
      if (result) {
        res.status(200).json({ message: "Delted deleted successfully" });
      } else {
        res.status(404).json({ message: "client not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }



}
