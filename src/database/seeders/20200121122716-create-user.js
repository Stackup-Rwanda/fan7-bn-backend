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
  },
  {
    email: 'fantastic6@gmail.com',
    user_name: 'great',
    first_name: 'Fantastic',
    last_name: 'Bro',
    role: 'requester',
    password: await hashPassword('Kemmy123'),
    line_manager: 'fantastic4@gmail.com',
    isVerified: true
  },
  {
    email: 'fantastic5@gmail.com',
    user_name: 'great',
    first_name: 'Fantastic',
    last_name: 'Bro',
    role: 'requester',
    password: await hashPassword('Kemmy123'),
    line_manager: 'fantastic4@gmail.com',
    isVerified: true
  },
  {
    email: 'fantastic4@gmail.com',
    user_name: 'great',
    first_name: 'Fantastic',
    last_name: 'Bro',
    role: 'manager',
    password: await hashPassword('Kemmy123'),
    isVerified: true
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
