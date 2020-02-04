import hash from '../../utils/hash';

const { hashPassword } = hash;

export default {
  up: async queryInterface => queryInterface.bulkInsert('Users', [{
    email: 'fantastic7@gmail.com',
    user_name: 'great',
    first_name: 'Fantastic',
    last_name: 'Bro',
    role: 'super-administrator',
    password: await hashPassword('Kemmy123'),
    isVerified: true
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
