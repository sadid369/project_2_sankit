'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const col = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let i = 0; i < 8; i++) {
      await queryInterface.bulkInsert("Seats", [
        {
          airplaneId: 14,
          row: 2,
          col: col[i],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
