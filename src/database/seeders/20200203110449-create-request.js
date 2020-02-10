export default {
  up: async queryInterface => queryInterface.bulkInsert('Requests', [{
    user_id: 1,
    status: 'Pending',
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    gender: 'Female',
    dob: '12/Nov/1673',
    origin: 'Rwanda, Kigali',
    destination: 'Kenya, Nairobi',
    travel_date: '2020-10-29',
    reason: 'life is short, just chill',
    accommodation_id: 1
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Requests', null, {})
};
