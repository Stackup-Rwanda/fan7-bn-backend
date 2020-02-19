export default {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Locations',
    [
      {
        destination: 'kenya, nairobi',
        visit_count: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        destination: 'burundi, bujumbura',
        visit_count: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        destination: 'rwanda, kigali',
        visit_count: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Locations', null, {})
};
