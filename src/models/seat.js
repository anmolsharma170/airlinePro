'use strict';
const {
  Model
} = require('sequelize');
const {Enums} = require('../utils/common') 
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane,{
        foreignKey: 'airplaneId',
      })
    }
  }
  Seat.init({
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {    // this is association of seat with airplane because one airplane can have multiple seats and we are associating the seat table with the airplane table based on the airplaneId and id of the airplane table
        model: 'Airplane',
        key: 'id'
      },
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    col: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: ['business','economy','premium-economy','first-class'],
      defaultValue: 'economy',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};