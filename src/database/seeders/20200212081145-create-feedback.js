export default {
  up: queryInterface => queryInterface.bulkInsert('Feedbacks', [{
    user_id: 1,
    accommodation_id: 1,
    feedback: 'Provide better breakfast',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    user_id: 1,
    accommodation_id: 2,
    feedback: 'wifi working slow',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Feedbacks', null, {})
};
