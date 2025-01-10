import { DataTypes } from 'sequelize';
const sequelize = require('../connect/index'); // Adjust the import as per your actual connection

const Employees = sequelize.define(
  'Employee', // Model name (logical name in the code)
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    guid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middlename: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailaddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    staffnumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateofbirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    pan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    citizennumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    positionid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateofjoining: { // Corrected field name
      type: DataTypes.DATE,
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
  },
  {
    tableName: 'employess', // Explicitly maps to the 'employess' table in the database
    timestamps: false, // Disables automatic timestamp fields
  }
);

export default Employees;
