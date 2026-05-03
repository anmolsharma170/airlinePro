'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane,{
        foreignKey: 'airplaneId'
      });
      this.belongsTo(models.Airport,{
        foreignKey: 'departure_airport_Id'
      })
      this.belongsTo(models.Airport,{
        foreignKey: 'arrival_airport_Id'
      })
    }
  }
  Flights.init({
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    airplaneId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departure_airport_Id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    arrival_airport_Id:{
      type: DataTypes.STRING,
      allowNull: false
    },
    departure_time:{
      type: DataTypes.TIME,
      allowNull: false
    },
    arrival_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_seats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    boardingGate: {
      type: DataTypes.STRING
    },
    airline_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Flights',
  });
  return Flights;
};