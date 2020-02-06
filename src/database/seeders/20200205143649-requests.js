export default {
  up: queryInterface => queryInterface.bulkInsert('Requests', [{
    user_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),

  }], {}),
  down: queryInterface => queryInterface.bulkDelete('Requests', null, {})
};
