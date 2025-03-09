import { DropdownMapper } from './../mapper/DropdownMapper';
import { Logger } from "./../logger/logger";
import { CommonService } from './../common/common';
import { ErrorMessageModel } from '../models/ErrorMessages';
import { DropdownService } from "../services/DropdownService";

const commonService = new CommonService();

export class DropdownController {

    async GetDropdownList(req, res) {
        try {

            const filters: any = {};
                for (const [key, value] of Object.entries(req.query)) {
                if (key !== "Search") {
                    filters[key] = value; 
                }
            };

            const varparams = {
                tablename: req.params.dropdownName,
                filters: Object.keys(filters).length ? filters : null, 
                search: req.query.Search || '',
                userid : req.userId,
                clientid:req.clientId
            };

            const dropdownService = new DropdownService();
            const results = await dropdownService.LoadDropdownList(varparams);

            
            const dropdownMapper = new DropdownMapper();
            const mappedDropdowns = dropdownMapper.ModelToDto(results);
            
            res.status(200).json(mappedDropdowns);

        } catch (err) {
            new Logger().Error('GetDropdownList', err.toString(), req.userId, req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({ error: result.errormessage });
        }
    }

}









