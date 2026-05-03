'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightNumber:{
        type: Sequelize.STRING,
        allowNull: false
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          table: 'Airplanes',
          field: 'id'
        },
        onDelete: 'CASCADE'
      },
      departure_airport_Id: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model: 'Airports',
          key: 'code'
        },
        onDelete: 'CASCADE'
      },
      arrival_airport_Id: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model: 'Airports',
          key: 'code'
        },
        onDelete: 'CASCADE'
      },
      departure_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      arrival_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      boardingGate:{
        type: Sequelize.STRING,
        allowNull: false
      },
      total_seats: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      airline_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  }
};