import { Sequelize, DataTypes } from 'sequelize';
const usersModel = require('./users');
const animalsModel =require('./animals');

const url : string = process.env.DATABASE_URL || require('./env');

const sequelize = new Sequelize(url, { dialectOptions: { ssl: true } })

const db = {
  sequelize,
  users: usersModel(sequelize, DataTypes),
  animals: animalsModel(sequelize, DataTypes),
};

db.users.hasOne(db.animals, {
  foreignKey: 'ownerId'
});

export = db;