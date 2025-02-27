const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');

export class ManufactureModel extends Model {}

ManufactureModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailaddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phonenumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    modified: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deleted: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    timestamps: false,
    modelName: 'manufacture',
    tableName: 'manufactures'
});

export default ManufactureModel;
