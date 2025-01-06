import { Logger } from "./../logger/logger";
import { ReportMapper } from "../mapper/ReportMapper";
import { ReportService } from './../services/ReportService';
import { ErrorMessageModel } from '../models/ErrorMessages';
import { CommonService } from './../common/common';
import { parse } from 'json2csv'; 

const commonService = new CommonService()

export class ReportController {
    async GetReport(req, res) {
        try {
            const page = req.query.Page ? req.query.Page : 1;
            const limit = req.query.Limit ? req.query.Limit : 10;
            const inventoryDescriptionId = req.query.InventoryDescriptionId ? req.query.InventoryDescriptionId : null;
            const buyerId = req.query.BuyerId ? req.query.BuyerId : null;
            const dateFrom = req.query.FromDate ? req.query.FromDate : null;
            const dateTo = req.query.ToDate ? req.query.ToDate : null;

            const pageOffSet = (page - 1) * limit;
            const pageLimit = limit;
            const varparams = {
                pageoffset: pageOffSet,
                pagelimit: pageLimit,
                search: req.query.Search ? req.query.Search : '',
                sortby: req.query.SortBy ? req.query.SortBy : '',
                sortorder: req.query.SortOrder ? req.query.SortOrder : 'ASC',
                inventorydescriptionguid: inventoryDescriptionId,
                buyerguid: buyerId,
                datefrom: dateFrom,
                dateto: dateTo
            };

            const reportService = new ReportService();
            const results = await reportService.GetReport(varparams);
            res.header("X-Page-TotalCount", results.length > 0 ? results[0].total : 0);

            const reportMapper = new ReportMapper();
            const mappedTeams = reportMapper.ModelToDto(results);

            res.status(200).json(mappedTeams);

        } catch (err) {
            new Logger().Error('GetReport', err.toString(), req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({ error: result.errormessage });
        }
    }

    async GetReportCSV(req, res) {
        try {
            const page = req.query.Page ? req.query.Page : 1;
            const limit = req.query.Limit ? req.query.Limit : 10;
            const inventoryDescriptionId = req.query.InventoryDescriptionId ? req.query.InventoryDescriptionId : null;
            const buyerId = req.query.BuyerId ? req.query.BuyerId : null;
            const dateFrom = req.query.FromDate ? req.query.FromDate : null;
            const dateTo = req.query.ToDate ? req.query.ToDate : null;

            const pageOffSet = (page - 1) * limit;
            const pageLimit = limit;
            const varparams = {
                pageoffset: pageOffSet,
                pagelimit: pageLimit,
                search: req.query.Search ? req.query.Search : '',
                sortby: req.query.SortBy ? req.query.SortBy : '',
                sortorder: req.query.SortOrder ? req.query.SortOrder : 'ASC',
                inventorydescriptionguid: inventoryDescriptionId,
                buyerguid: buyerId,
                datefrom: dateFrom,
                dateto: dateTo
            };

            const reportService = new ReportService();
            const results = await reportService.GetReport(varparams);

            if (results.length === 0) {
                res.status(404).send('No data available');
                return;
            };

            const reportMapper = new ReportMapper();
            const mappedResults = reportMapper.ModelToFlatDtoForCustomerWithSeparateRows(results);

            const csv = parse(mappedResults);

            res.header('Content-Type', 'text/csv');
            res.attachment('report.csv');
            res.status(200).send(csv);

        } catch (err) {
            new Logger().Error('GetReportCSV', err.toString(), req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({ error: result.errormessage });
        }
    }
}
