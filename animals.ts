import {
  Sequelize,
  DataTypes,
  Model,
  BuildOptions,
  ModelAttributeColumnOptions,
} from 'sequelize';

export interface AnimalModel extends Model {
  readonly id: ModelAttributeColumnOptions;
  readonly type: ModelAttributeColumnOptions;
  readonly name: ModelAttributeColumnOptions;
  readonly dateOfBirth: ModelAttributeColumnOptions;
  readonly dateOfDeath: ModelAttributeColumnOptions;
  readonly lastVisit: ModelAttributeColumnOptions;
  readonly medicalHistory: ModelAttributeColumnOptions;
  readonly lastVaccination: ModelAttributeColumnOptions;
  readonly ownerId: ModelAttributeColumnOptions;
  readonly isActive: ModelAttributeColumnOptions;
}

export type AnimalModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => AnimalModel);

export const animalsModel = (
  sequelize: Sequelize,
  dataTypes: typeof DataTypes,
): AnimalModelStatic =>
  sequelize.define('animals', {
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    type: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    dateOfDeath: {
      type: dataTypes.DATE,
      allowNull: true,
    },
    lastVisit: {
      type: dataTypes.DATE,
      allowNull: true,
    },
    medicalHistory: {
      type: dataTypes.ARRAY(dataTypes.INTEGER),
      allowNull: true,
    },
    lastVaccination: {
      type: dataTypes.DATE,
      allowNull: true,
    },
    ownerId: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: dataTypes.BOOLEAN,
      allowNull: false,
    },
  }) as AnimalModelStatic;
