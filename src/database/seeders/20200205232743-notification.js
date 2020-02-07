export default {
  up: queryInterface => queryInterface.bulkInsert('Notifications', [{
    user_id: 3,
    request_id: 1,
    type: 'create_request',
    message: 'New request created'
  },
  {
    user_id: 3,
    request_id: 1,
    type: 'create_request',
    message: 'New request created'
  },
  {
    user_id: 2,
    request_id: 2,
    type: 'create_request',
    message: 'New request created'
  },
  {
    user_id: 2,
    request_id: 1,
    type: 'create_request',
    message: 'New request created'
  },
  {
    user_id: 4,
    request_id: 2,
    type: 'create_request',
    message: 'New request created'
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Notifications', null, {})
};
