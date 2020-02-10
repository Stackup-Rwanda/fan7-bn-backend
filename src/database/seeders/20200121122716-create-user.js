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
  },
  {
    email: 'trey@3gmail.com',
    user_name: 'Trey',
    password: await hashPassword('Trey1234'),
    isVerified: true,
    line_manager: 'trey3@gmail.com'
  },
  {
    email: 'elvisrugamba@gmail.com',
    user_name: 'great',
    role: 'manager',
    password: await hashPassword('Kemmy123'),
    isVerified: true
  },
  {
    email: 'elvis@gmail.com',
    user_name: 'great',
    role: 'requester',
    password: await hashPassword('Kemmy123'),
    line_manager: 'elvisrugamba@gmail.com',
    isVerified: true
  },
  {
    email: 'rugamba@gmail.com',
    user_name: 'great',
    role: 'requester',
    password: await hashPassword('Kemmy123'),
    line_manager: 'elvisrugamba@gmail.com',
    isVerified: true
  },
  {
    email: 'shaazk@gmail.com',
    user_name: 'great',
    role: 'requester',
    password: await hashPassword('Kemmy123'),
    line_manager: 'elv@gmail.com',
    isVerified: true
  },
  {
    email: 'sharon@gmail.com',
    user_name: 'great',
    role: 'super-administrator',
    password: await hashPassword('Kemmy123'),
    isVerified: true
  },
  {
    email: 'kiza@gmail.com',
    user_name: 'great',
    role: 'manager',
    password: await hashPassword('Kemmy123'),
    isVerified: true
  },
  {
    email: 'rugambaelvis@gmail.com',
    user_name: 'great',
    role: 'manager',
    password: await hashPassword('Kemmy123'),
    isVerified: true
  },
  {
    email: 'elru@gmail.com',
    user_name: 'great',
    role: 'requester',
    line_manager: 'rugambaelvis@gmail.com',
    password: await hashPassword('Kemmy123'),
    isVerified: true
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
