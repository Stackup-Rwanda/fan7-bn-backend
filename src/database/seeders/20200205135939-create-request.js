export default {
  up: queryInterface => queryInterface.bulkInsert('Requests', [{
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    gender: 'Female',
    dob: '12/Nov/1673',
    origin: 'Rwanda, Kigali',
    destination: 'Kenya, Nairobi',
    travel_date: '2020-10-29',
    reason: 'life is short, just chill',
    accommodation_id: 1,
    user_id: 1
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Requests', null, {})
};
