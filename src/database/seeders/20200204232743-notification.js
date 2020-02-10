export default {
  up: queryInterface => queryInterface.bulkInsert('Notifications', [{
    user_id: 3,
    request_id: 1,
    type: 'Created',
    message: 'New request created'
  },
  {
    user_id: 3,
    request_id: 1,
    type: 'Created',
    message: 'New request created'
  },
  {
    user_id: 2,
    request_id: 2,
    type: 'Created',
    message: 'New equest has been created, waiting for approval'
  },
  {
    user_id: 2,
    request_id: 1,
    type: 'Created',
    message: 'New equest has been created, waiting for approval'
  },
  {
    user_id: 4,
    request_id: 2,
    type: 'Created',
    message: 'New equest has been created, waiting for approval'
  },
  {
    user_id: 11,
    request_id: 4,
    type: 'Approved',
    message: 'Your request has been approved'
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Notifications', null, {})
};
