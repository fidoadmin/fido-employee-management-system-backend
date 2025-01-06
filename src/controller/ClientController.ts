import { Logger } from "./../logger/logger";
import { CommonService } from './../common/common';
import { ErrorMessageModel } from '../models/ErrorMessages';
import { ClientService } from "../services/ClientService";
import { ClientMapper } from "../mapper/ClientMapper";
const commonService = new CommonService();

export class ClientController {

    async GetClients(req, res) {
        try {
            const page = req.query.Page ? parseInt(req.query.Page) : 1;
            const limit = req.query.Limit?parseInt(req.query.Limit):10;
            const pageoffset = (page - 1) * limit;
            const pagelimit = limit;
            const varparams = {
                pageoffset: pageoffset,
                pagelimit: pagelimit,
                search: req.query.Search ? req.query.Search : '',
                sortby: req.query.SortBy ? req.query.SortBy : 'modified',
                sortorder: req.query.SortOrder ? req.query.SortOrder : 'desc',
            };

            const clientService = new ClientService();
            const results = await clientService.LoadClients(varparams);
            res.header("X-Page-TotalCount", results.length > 0 ? results[0].total : 0);

            const clientMapper = new ClientMapper();
            const mapperresults = clientMapper.ModelToDto(results);

            res.status(200).json(mapperresults);

        } catch (err) {
            new Logger().Error('GetClients', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    }

    async UpsertClient(req, res) {
       
        try {
            const clientdata = req.body;

            const clientMapper = new ClientMapper();
            const mappedData = clientMapper.DtoToModel(clientdata,req.userId);

            const clientService = new ClientService();
            const result = await clientService.UpsertClient(mappedData);

            if (result[0].result == 'Duplicate client name') {
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4223 });
                res.status(409).json({error: result.errormessage});
                return;
            };

            res.status(200).json({Id:result[0].result});

        } catch (err) {
            new Logger().Error('UpsertClient', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            return res.status(500).json({error: result.errormessage});
            
        }
    };

}
