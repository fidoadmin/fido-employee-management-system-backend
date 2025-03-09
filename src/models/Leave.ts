const { DataTypes, Model } = require("sequelize");
const sequelize = require("../connect/index"); 
export class LeaveModel extends Model {}

LeaveModel.init(
  {
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
    startdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    enddate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    numberofdays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    approvercomment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    leavetypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    employeesid: {
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
    },
    approverid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Leave",
    tableName: "leaves",
    schema: "public",
  }
);
