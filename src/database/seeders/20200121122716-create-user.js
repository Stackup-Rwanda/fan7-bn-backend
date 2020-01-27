export default {
  up: (queryInterface) => queryInterface.bulkInsert('User', [{
    email: 'fantastic7@gmail.com',
    user_name: 'great',
    first_name: 'Fantastic',
    last_name: 'Bro',
    password: '$2a$10$0Eyb0ffngluRWMPKntqT0.gok2DxiAcJxfBFObpN8/pMG5Tm/pmom',
    role: 'super-administrator'
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('User', null, {})
};
