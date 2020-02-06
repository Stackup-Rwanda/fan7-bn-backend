export default {
  up: queryInterface => queryInterface.bulkInsert('Accommodation', [
    {
      name: 'John Doe',
      location: 'rwanda, kigali',
      capacity: 56
    },
    {
      name: 'serena hotel',
      location: 'rwanda, kigali',
      capacity: 34
    }], {}),

  down: queryInterface => queryInterface.bulkDelete('Accommodation', null, {})
};
