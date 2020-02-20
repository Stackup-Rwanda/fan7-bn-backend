export default {
  up: queryInterface => queryInterface.bulkInsert('Likes', [{
    user_id: 9,
    accommodation_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    user_id: 2,
    accommodation_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Likes', null, {})
};
