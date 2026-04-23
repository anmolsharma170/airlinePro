'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports',{
      type: 'FOREIGN KEY',
      name: 'city_fkey_constraint',
      fields: ['cityId'],
      references: {
        table: 'Cities',
        field : 'id'
      },
      onUpdate: 'CASCADE',
      onDELETE: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports','city_fkey_constraint');
  }
};


//  npx sequelize migration:generate --name update-city-airport-association 
// this is achieved using this command. It creates a new migration file with the given name. We can then edit this file to add the necessary changes to update the city-airport association in the database.
// and main agenda for it is to add foreign key constraint to cityId in airport table and also add onDelete cascade so that when a city is deleted, all associated airports are also deleted. This ensures data integrity and prevents orphaned records in the database.