export default {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Rooms',
    [
      {
        type: '2 bed room, 3 bed rooms',
        accommodation_id: 1,
        booked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: '2 bed room, 3 bed rooms',
        accommodation_id: 1,
        booked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: '2 bed room, 3 bed rooms',
        accommodation_id: 1,
        booked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: '3 bed room, 4 bed rooms',
        accommodation_id: 1,
        booked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Rooms', null, {})
};
