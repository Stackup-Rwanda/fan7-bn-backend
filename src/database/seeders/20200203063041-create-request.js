export default {
  up: queryInterface => queryInterface.bulkInsert('Requests', [{
    user_id: 7,
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    origin: 'Rwanda, Kigali',
    destination: ['Kenya, Nairobi'],
    travel_date: ['2020-10-29'],
    reason: 'Conference meeting',
    status: 'Approved',
    type: 'oneway'
  },
  {
    user_id: 8,
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    origin: 'Rwanda, Kigali',
    destination: ['Kenya, Nairobi'],
    travel_date: ['2020-10-29'],
    reason: 'Business Trip',
    status: 'Pending',
    type: 'oneway'
  },
  {
    user_id: 9,
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    origin: 'Rwanda, Kigali',
    destination: ['Kenya, Nairobi'],
    travel_date: ['2020-10-29'],
    reason: 'Conference Meeting',
    status: 'Pending',
    type: 'oneway'

  },
  {
    user_id: 14,
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    origin: 'Rwanda, Kigali',
    destination: ['Kenya, Nairobi'],
    travel_date: ['2020-10-29'],
    reason: 'lBusiness Meeting',
    status: 'Pending',
    type: 'oneway'
  },
  {
    user_id: 6,
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    origin: 'Rwanda, Kigali',
    destination: ['Kenya, Nairobi'],
    travel_date: ['2020-10-29'],
    reason: 'Contract signing',
    status: 'Pending',
    type: 'oneway'
  },
  {
    user_id: 7,
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    origin: 'Rwanda, Kigali',
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
    reason: 'Business meeting',
    status: 'Pending',
    type: 'oneway'
  },
  {
    user_id: 7,
    passportName: 'Boris Bihire',
    passportNumber: 198700,
    origin: 'Rwanda, Kigali',
    destination: ['Kenya, Nairobi'],
    travel_date: ['2020-10-29'],
    reason: 'Conference Meeting',
    status: 'Approved',
    type: 'oneway'
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Requests', null, {})
};
