const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index'); // Adjust the import as per your actual connection

export class PositionModel extends Model {}

PositionModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    guid: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
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
    modelName: 'Position',
    tableName: 'positions', // Explicitly maps to 'positions' table in the database
    schema: 'common' // Explicitly set the schema if needed
});

export default PositionModel;
