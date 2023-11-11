'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'unit',
      [
        {
          idUnit: 1,
          name: 'FGA',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idUnit: 2,
          name: 'unidadeGenerica2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('unit', null, {});
  },
};
