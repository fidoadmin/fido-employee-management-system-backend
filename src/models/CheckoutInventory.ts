const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect/index');

export class CheckoutInventoryModel extends Model {}

CheckoutInventoryModel.init({
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
    inventoryid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sellerid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    checkoutid: {
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
  modelName: 'checkoutInventory',
  tableName: 'checkoutinventories'
});
