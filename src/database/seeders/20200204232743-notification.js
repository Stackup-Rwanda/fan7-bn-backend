export default {
  up: queryInterface => queryInterface.bulkInsert('Notifications', [{
    user_id: 3,
  },
  {
    user_id: 3,
  },
  {
    user_id: 2,
  },
  {
    user_id: 2,
  },
  {
    user_id: 4,
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Notifications', null, {})
};
