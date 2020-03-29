import {
  Sequelize,
  DataTypes,
  Model,
  BuildOptions,
  ModelAttributeColumnOptions,
} from 'sequelize';

export interface UserModel extends Partial<Model> {
  id: ModelAttributeColumnOptions;
  firstname: ModelAttributeColumnOptions;
  lastname: ModelAttributeColumnOptions;
  pesel: ModelAttributeColumnOptions;
  address: ModelAttributeColumnOptions;
  city: ModelAttributeColumnOptions;
  telephone: ModelAttributeColumnOptions;
  email: ModelAttributeColumnOptions;
  password: ModelAttributeColumnOptions;
  isActive: ModelAttributeColumnOptions;
}

export type UserModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => UserModel);

export const usersModel = (
  sequelize: Sequelize,
  dataTypes: typeof DataTypes,
): UserModelStatic =>
  sequelize.define('users', {
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    firstname: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    pesel: {
      type: dataTypes.BIGINT,
      allowNull: false,
    },
    address: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    telephone: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: dataTypes.BOOLEAN,
      allowNull: false,
    },
  }) as UserModelStatic;
