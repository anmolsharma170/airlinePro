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
    }
  }
  Flights.init({
    flightNumber: DataTypes.INTEGER,
    airplaneId: DataTypes.INTEGER,
    departure_airport_Id: DataTypes.INTEGER,
    arrival_airport_id: DataTypes.INTEGER,
    departure_time: DataTypes.TIME,
    arrival_time: DataTypes.TIME,
    price: DataTypes.INTEGER,
    total_seats: DataTypes.INTEGER,
    boardingGate: DataTypes.STRING,
    airline_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Flights',
  });
  return Flights;
};