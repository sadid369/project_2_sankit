'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      "Airports", {
      fields: ["cityId"],
      type: 'foreign key',
      name: 'city_fKey_constraint',
      references: {
        table: 'Cities',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
    );
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports', 'city_fKey_constraint');
  }
};
