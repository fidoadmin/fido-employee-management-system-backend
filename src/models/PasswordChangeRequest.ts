const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');

export class PasswordChangeRequestModel extends Model {}

PasswordChangeRequestModel.init({
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
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isused: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
  modelName: 'PasswordChangeRequest',
  tableName: 'passwordchangerequests'
});
