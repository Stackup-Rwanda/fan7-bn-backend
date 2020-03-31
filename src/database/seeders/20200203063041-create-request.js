export default {
  up: queryInterface => queryInterface.bulkInsert('Requests', [{
    user_id: 7,
    passportName: 'Rugamba Elvis',
    passportNumber: 198700,
    origin: 'Rwanda, Kigali',
    destination: ['Kenya, Nairobi'],
    travel_date: ['2020-10-29'],
    accommodation_id: 1,
    reason: 'Conference meeting',
    status: 'Approved',
    type: 'oneway'
  },
  {
    user_id: 8,
    passportName: 'Mutesi Sharon',
    passportNumber: 198700,
    origin: 'Rwanda, Kigali',
    destination: ['Kenya, Nairobi'],
    travel_date: ['2020-10-29'],
    accommodation_id: 1,
    reason: 'Business Trip',
    status: 'Pending',
    type: 'oneway'
  },
  {
    user_id: 9,
    passportName: 'Karangwa Emmy',
    passportNumber: 198700,
    origin: 'Rwanda, Kigali',
    destination: ['Kenya, Nairobi'],
    travel_date: ['2020-10-29'],
    accommodation_id: 1,
    reason: 'Conference Meeting',
    status: 'Pending',
    type: 'oneway'

  },
  {
    user_id: 14,
    passportName: 'Karekezi Eric',
    passportNumber: 198700,
    origin: 'Rwanda, Kigali',
    destination: ['Kenya, Nairobi'],
    travel_date: ['2020-10-29'],
    accommodation_id: 1,
    reason: 'lBusiness Meeting',
    status: 'Pending',
    type: 'oneway'
  },
  {
    user_id: 6,
    passportName: 'Mistico Clement',
    passportNumber: 198700,
    origin: 'Rwanda, Kigali',
    destination: ['Kenya, Nairobi'],
    travel_date: ['2020-10-29'],
    accommodation_id: 1,
    reason: 'Contract signing',
    status: 'Pending',
    type: 'oneway'
  },
  {
    user_id: 7,
    passportName: 'Alexanda Prince',
    passportNumber: 198700,
    origin: 'Rwanda, Kigali',
    accommodation_id: 1,
    destination: ['Kenya, Nairobi'],
    travel_date: ['2020-10-29'],
    reason: 'Exhibition',
    status: 'Pending',
    type: 'oneway'
  },
  {
    user_id: 1,
    origin: 'kigali',
    destination: ['lagos'],
    travel_date: ['2020-02-06T07:53:43.311Z'],
    return_date: '2020-02-12T10:53:43.311Z',
    accommodation_id: 1,
    status: 'Pending',
    type: 'returnTrip'
  },
  {
    user_id: 8,
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    origin: 'Rwanda, Kigali',
    destination: ['Kenya, Nairobi'],
    travel_date: ['2020-10-29'],
    accommodation_id: 1,
    reason: 'Business meeting',
    status: 'Pending',
    type: 'oneway'
  },
  {
    user_id: 7,
    passportName: 'Niwemugisha Denis',
    passportNumber: 198700,
    origin: 'Rwanda, Kigali',
    destination: ['Kenya, Nairobi'],
    travel_date: ['2020-10-29'],
    accommodation_id: 1,
    reason: 'Conference Meeting',
    status: 'Approved',
    type: 'oneway'
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Requests', null, {})
};
