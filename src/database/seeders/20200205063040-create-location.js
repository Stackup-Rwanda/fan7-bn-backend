export default {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Locations',
    [
      {
        destination: 'Rwanda, Kigali',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        destination: 'Burundi, Bujumbura',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        destination: 'Nigeria, Lagos',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Locations', null, {})
};
