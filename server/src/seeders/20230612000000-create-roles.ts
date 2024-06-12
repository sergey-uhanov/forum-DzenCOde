import { QueryInterface } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('roles', [
      {
        value: 'ADMIN',
        description: 'Administrator role',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        value: 'USER',
        description: 'User role',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
