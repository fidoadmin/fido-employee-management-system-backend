const Sequelize = require('sequelize');
var moment = require('moment');
const dbConnect = require('../connect/index');
import { CommonService } from '../common/common';
import { CategoryModel } from '.././models/Category';

export class CategoryService {
    async LoadCategories(varparams: any) {
        const query = `SELECT * FROM accord.getcategories(:varjsonparams)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsonparams: JSON.stringify(varparams) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

    async UpsertCategory(categoryData: any) {
        const query = `SELECT * FROM accord.upsertcategory(:varjsondata)`;
        const result = await dbConnect.query(query, {
            replacements: { varjsondata: JSON.stringify(categoryData) },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

    async DeleteCategory(categoryGuid: string) {
        const query = `SELECT * FROM accord.deletecategory(:varcategoryguid)`;
        const result = await dbConnect.query(query, {
            replacements: { varcategoryguid: categoryGuid },
            type: Sequelize.QueryTypes.SELECT
        });
        return result;
    }

    
}
