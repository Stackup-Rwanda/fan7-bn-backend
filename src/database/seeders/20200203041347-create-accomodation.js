export default {
  up: queryInterface => queryInterface.bulkInsert('Accommodations', [
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

  down: queryInterface => queryInterface.bulkDelete('Accommodations', null, {})
};
