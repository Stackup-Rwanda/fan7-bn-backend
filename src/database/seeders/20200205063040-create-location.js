export default {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Locations',
    [
      {
        destination: 'kenya, nairobi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        destination: 'burundi, bujumbura',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        destination: 'rwanda, kigali',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Locations', null, {})
};
