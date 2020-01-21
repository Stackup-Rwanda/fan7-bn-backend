export default {
  up: (queryInterface) => queryInterface.bulkInsert('User', [{
    email: 'fantastic7@gmail.com',
    password: 'Fantastic7'
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('User', null, {})
};
