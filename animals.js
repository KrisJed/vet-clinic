const animalsModel = (sequelize, DataTypes) =>
  sequelize.define('animals', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },    
    dateOfDeath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastVisit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medicalHistory: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },  
    lastVaccination: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ownerId: {
        type: DataTypes.CHAR(40),
        allowNull: false,
      },  
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
  });

module.exports = animalsModel;