export default {
  up: queryInterface => queryInterface.bulkInsert('Requests', [{
    user_id: 7,
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    gender: 'Female',
    dob: '12/Nov/1673',
    origin: 'Rwanda, Kigali',
    destination: 'Kenya, Nairobi',
    travel_date: '2020-10-29',
    reason: 'life is short, just chill',
    accommodation_id: 1,
    status: 'Pending'
  },
  {
    user_id: 8,
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    gender: 'Female',
    dob: '12/Nov/1673',
    origin: 'Rwanda, Kigali',
    destination: 'Kenya, Nairobi',
    travel_date: '2020-10-29',
    reason: 'life is short, just chill',
    accommodation_id: 1,
    status: 'Pending'
  },
  {
    user_id: 9,
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    gender: 'Female',
    dob: '12/Nov/1673',
    origin: 'Rwanda, Kigali',
    destination: 'Kenya, Nairobi',
    travel_date: '2020-10-29',
    reason: 'life is short, just chill',
    accommodation_id: 1,
    status: 'Pending'
  },
  {
    user_id: 6,
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    gender: 'Female',
    dob: '12/Nov/1673',
    origin: 'Rwanda, Kigali',
    destination: 'Kenya, Nairobi',
    travel_date: '2020-10-29',
    reason: 'life is short, just chill',
    accommodation_id: 1,
    status: 'Pending'
  },
  {
    user_id: 7,
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    gender: 'Female',
    dob: '12/Nov/1673',
    origin: 'Rwanda, Kigali',
    destination: 'Kenya, Nairobi',
    travel_date: '2020-10-29',
    reason: 'life is short, just chill',
    accommodation_id: 1,
    status: 'Pending'
  },
  {
    user_id: 1,
    origin: 'kigali',
    destination: 'lagos',
    travel_date: '2020-02-06T07:53:43.311Z',
    return_date: '2020-02-12T10:53:43.311Z',
    status: 'Pending'
  },
  {
    user_id: 8,
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    gender: 'Female',
    dob: '12/Nov/1673',
    origin: 'Rwanda, Kigali',
    destination: 'Kenya, Nairobi',
    travel_date: '2020-10-29',
    reason: 'life is short, just chill',
    accommodation_id: 1,
    status: 'Pending'
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Requests', null, {})
};
