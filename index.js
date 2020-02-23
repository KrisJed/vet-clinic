const { Sequelize, DataTypes } = require('sequelize');
const usersModel = require('./users');
const animalsModel = require('./animals');
const uri = require('./env');

const sequelize = new Sequelize(uri, { dialectOptions: { ssl: true } })

const db = {
  sequelize,
  users: usersModel(sequelize, DataTypes),
  animals: animalsModel(sequelize, DataTypes),
};

module.exports = db;