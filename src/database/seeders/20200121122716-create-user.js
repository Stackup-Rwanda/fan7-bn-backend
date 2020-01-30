export default {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    email: 'fantastic7@gmail.com',
    user_name: 'great',
    first_name: 'Fantastic',
    last_name: 'Bro',
    password: '$2a$10$F49hLnKL.PPvN/sc205VmO2onEU7sZYpCqe2Cc4UACGArz2455.R2',
    role: 'super-administrator'
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
