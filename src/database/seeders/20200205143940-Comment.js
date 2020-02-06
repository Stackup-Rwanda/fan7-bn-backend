export default {
  up: queryInterface => queryInterface.bulkInsert('Comments', [{
    user_id: 1,
    request_id: 1,
    comment: 'This si the first comment of this travel request',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user_id: 2,
    request_id: 1,
    comment: 'This is the second comment of this travel request',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('Comments', null, {})
};
