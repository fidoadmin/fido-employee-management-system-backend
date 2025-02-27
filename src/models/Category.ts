const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');

export class CategoryModel extends Model {}

CategoryModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isexpirationdate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    modified: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    deleted: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'category',
    tableName: 'categories'
});
