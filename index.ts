import { Sequelize, DataTypes } from 'sequelize';

import { usersModel, UserModelStatic } from './users';
import { animalsModel, AnimalModelStatic } from './animals';

import env from './env';

const url: string = process.env.DATABASE_URL || env;

const sequelize: Sequelize = new Sequelize(url, {
  dialectOptions: { ssl: true },
});

const db: {
  sequelize: Sequelize;
  users: UserModelStatic;
  animals: AnimalModelStatic;
} = {
  sequelize,
  users: usersModel(sequelize, DataTypes),
  animals: animalsModel(sequelize, DataTypes),
};

db.users.hasOne(db.animals, { foreignKey: 'ownerId' });

export default db;
