import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

// class User extends Model {
//   public id!: number; // Note that the `null assertion` `!` is required in strict mode.
//   public name!: string;
//   public preferredName!: string | null; // for nullable fields

//   // timestamps!
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;

//   // Since TS cannot determine model association at compile time
//   // we have to declare them here purely virtually
//   // these will not exist until `Model.init` was called.

//   public getProjects!: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
//   public addProject!: HasManyAddAssociationMixin<Project, number>;
//   public hasProject!: HasManyHasAssociationMixin<Project, number>;
//   public countProjects!: HasManyCountAssociationsMixin;
//   public createProject!: HasManyCreateAssociationMixin<Project>;

//   // You can also pre-declare possible inclusions, these will only be populated if you
//   // actively include a relation.
//   public readonly projects?: Project[]; // Note this is optional since it's only populated when explicitly requested in code

//   public static associations: {
//     projects: Association<User, Project>;
//   };
// }

const usersModel = (sequelize, DataTypes) =>
  sequelize.define('users', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pesel: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telephone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });

export = usersModel;