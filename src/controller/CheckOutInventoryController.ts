import { CheckoutInventoryService } from "../services/CheckOutInventoryService";
import { Logger } from "../logger/logger";
import { CheckoutInventoryMapper } from "../mapper/CheckOutInventoryMapper"; 
import { CommonService } from '../common/common';
import { ErrorMessageModel } from '../models/ErrorMessages';

const commonService = new CommonService();

export class CheckoutInventoryController {
    async GetCheckoutInventories(req, res) {
        try {
            const page = req.query.Page ? req.query.Page : 1;
            const limit = req.query.Limit ? req.query.Limit : 10;
            const pageOffSet = (page - 1) * limit;
            const pageLimit = limit;
            const varparams = {
                pageoffset: pageOffSet,
                pagelimit: pageLimit,
                search: req.query.Search ? req.query.Search : '',
                sortby: req.query.SortBy ? req.query.SortBy : 'name',
                sortorder: req.query.SortOrder ? req.query.SortOrder : 'ASC'
            };

            const checkoutInventoryService = new CheckoutInventoryService();
            const results = await checkoutInventoryService.LoadCheckoutInventories(varparams);
            res.header("X-Page-TotalCount", results.length > 0 ? results[0].total : 0);

            const checkoutInventoryMapper = new CheckoutInventoryMapper();
            const mappedCheckoutInventories = checkoutInventoryMapper.ModelToDto(results);

            res.status(200).json(mappedCheckoutInventories);

        } catch (err) {
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({ error: result.errormessage });
        }
    };

    async UpsertCheckoutInventory(req, res) {
        try {
            const checkoutInventoryData = req.body;

            if (!checkoutInventoryData.inventoryid) {
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4221 });
                res.status(422).json({ error: result.errormessage });
                return;
            }

            const checkoutInventoryMapper = new CheckoutInventoryMapper();
            const mappedCheckoutInventory = checkoutInventoryMapper.DtoToModel(checkoutInventoryData);

            const checkoutInventoryService = new CheckoutInventoryService();
            const result = await checkoutInventoryService.UpsertCheckoutInventory(mappedCheckoutInventory);

            res.status(200).json({ id: result[0].result });

        } catch (err) {
            new Logger().Error('UpsertCheckoutInventory', err.toString(), req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({ error: result.errormessage });
        }
    };

    async DeleteCheckoutInventory(req, res) {
        try {
            const checkoutInventoryId = req.params.Id;

            const isGuid = await commonService.isUUID(checkoutInventoryId);
            if (!isGuid) {
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 422 });
                res.status(422).json({ error: result.errormessage });
                return;
            }

            const checkoutInventoryService = new CheckoutInventoryService();
            await checkoutInventoryService.DeleteCheckoutInventory(checkoutInventoryId);

            res.status(200).json();

        } catch (err) {
            new Logger().Error('DeleteCheckoutInventory', err.toString(), req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({ error: result.errormessage });
        }
    };

    async GetCheckoutInventory(req, res) {
        try {
            const id = req.params.id;

            const isGuid = await commonService.isUUID(id);
            if (!isGuid) {
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 422 });
                res.status(422).json({ error: result.errormessage });
                return;
            }

            const checkoutInventoryService = new CheckoutInventoryService();
            const checkoutInventoryData = await checkoutInventoryService.GetCheckoutInventory(id);
            if (checkoutInventoryData.length <= 0) {
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 404 });
                res.status(404).json({ error: result.errormessage });
                return;
            }

            const checkoutInventoryMapper = new CheckoutInventoryMapper();
            const mappedCheckoutInventory = checkoutInventoryMapper.ModelToDto(checkoutInventoryData);

            res.status(200).json(mappedCheckoutInventory[0]);

        } catch (err) {
            new Logger().Error('GetCheckoutInventory', err.toString(), req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({ error: result.errormessage })
        }
    }
}
