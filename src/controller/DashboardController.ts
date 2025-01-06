import { Logger } from "./../logger/logger";
import { CommonService } from './../common/common';
import { ErrorMessageModel } from '../models/ErrorMessages';
import { DashboardService } from "../services/DashboardService";
import { DashboardMapper } from "../mapper/DashboardMapper";
const commonService = new CommonService()

export class DashboardController {

    async GetDashboards(req, res) {
        try {
            const dashboardService = new DashboardService();
            const results = await dashboardService.LoadDashboard();

            const dashboardMapper = new DashboardMapper();
            const mapped = dashboardMapper.ModelToDto(results);

            res.status(200).json(results[0].results);

        } catch (err) {
            new Logger().Error('GetDashboards', err.toString(),  req.userId,req.clientId);
            const result = await commonService.GetModelData(ErrorMessageModel, { statuscode: 500 });
            res.status(500).json({error: result.errormessage});
        }
    }

   

} 
