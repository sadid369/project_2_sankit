"use strict";
const { faker } = require("@faker-js/faker");
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    for (let i = 0; i < 10; i++) {
      await queryInterface.bulkInsert("Airplanes", [
        {
          modelNumber: faker.airline.airplane().name,
          capacity: faker.number.int({ min: 180, max: 1000 }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // await queryInterface.bulkDelete("Airplanes", {
    //   [Op.or]: [{ modelNumber: "Douglas DC-8-50" }],
    // });
    await queryInterface.bulkDelete("Airplanes", {});
  },
};
