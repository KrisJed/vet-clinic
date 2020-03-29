const animalsModel = (sequelize, DataTypes) =>
  sequelize.define('animals', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateOfDeath: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastVisit: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    medicalHistory: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    lastVaccination: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });

module.exports = animalsModel;
