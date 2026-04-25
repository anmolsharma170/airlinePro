'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports',{ // query interface has many options like addcoulm so if we want to add a column to our table we can do it using it create tables delete tables add columns remove columns add constraints (foreign keys) rename tables change column types
      type: 'FOREIGN KEY',
      name: 'city_fkey_constraint',
      fields: ['cityId'],
      references: {
        table: 'Cities',
        field : 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports','city_fkey_constraint');
  }
};


//  npx sequelize migration:generate --name update-city-airport-association 
// this is achieved using this command. It creates a new migration file with the given name. We can then edit this file to add the necessary changes to update the city-airport association in the database.
// and main agenda for it is to add foreign key constraint to cityId in airport table and also add onDelete cascade so that when a city is deleted, all associated airports are also deleted. This ensures data integrity and prevents orphaned records in the database.