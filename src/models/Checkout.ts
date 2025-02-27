const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');

export class CheckoutModel extends Model {}

CheckoutModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    checkoutstartedby: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    checkoutcompletedby: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    buyerid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    statusid: {
        type: DataTypes.INTEGER,
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
    }
}, {
  sequelize,
  timestamps: false,
  modelName: 'checkout',
  tableName: 'checkouts'
});

