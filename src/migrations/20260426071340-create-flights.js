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
      airplaneId: {
        type: Sequelize.INTEGER
      },
      departure_airport_Id: {
        type: Sequelize.INTEGER
      },
      arrival_airport_id: {
        type: Sequelize.INTEGER
      },
      departure_time: {
        type: Sequelize.TIME
      },
      arrival_time: {
        type: Sequelize.TIME
      },
      price: {
        type: Sequelize.INTEGER
      },
      total_seats: {
        type: Sequelize.INTEGER
      },
      airline_name: {
        type: Sequelize.STRING
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