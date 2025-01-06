import { Logger } from "./../logger/logger";
import { BarcodeMapper } from "../mapper/BarcodeMapper";
import { BarcodeService } from './../services/BarcodeService';
import { ErrorMessageModel } from '../models/ErrorMessages';
import { CommonService } from './../common/common';

const commonService = new CommonService()

export class BarcodeController {
    async GenerateBarcodes(req, res) {
        try {
            
            const inventoryDescriptionId = req.body.InventoryDescriptionId?req.body.InventoryDescriptionId:null;
            const categoryId = req.body.CategoryId?req.body.CategoryId:null;
            const containerId = req.body.ContainerId?req.body.ContainerId:null;
            const numberOfBarcodes = req.body.NumberOfBarcodes?req.body.NumberOfBarcodes:null;
            
            const varparams = {
               inventorydescriptionguid:inventoryDescriptionId,
               categoryguid :categoryId,
               containerguid:containerId,
               numberofbarcodes:numberOfBarcodes
            };

            const barcodeService = new BarcodeService();
            const results = await barcodeService.GenerateBarcode(varparams);

            const barcodeMapper = new BarcodeMapper();
            const mappedBarcode = barcodeMapper.ModelToDto(results);

            if ( mappedBarcode[0] == 'Manufacturer Barcode' ){
                const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 4121 });
                res.status(412).json({error: result.errormessage});
                return;
            };

            res.status(200).json(mappedBarcode);

        } catch (err) {
            new Logger().Error('GenerateBarcodes', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    }

}
