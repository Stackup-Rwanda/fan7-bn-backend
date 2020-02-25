export default {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Bookings',
    [
      {
        checkin: '2020-10-01',
        checkout: '2020-10-02',
        accommodation_id: 1,
        room_id: 1,
        trip_id: 1,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        checkin: '2020-10-01',
        checkout: '2020-10-02',
        accommodation_id: 1,
        room_id: 4,
        user_id: 2,
        trip_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        checkin: '2020-10-01',
        checkout: '2020-10-02',
        accommodation_id: 1,
        room_id: 3,
        user_id: 2,
        trip_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        checkin: '2020-10-10',
        checkout: '2020-10-12',
        accommodation_id: 1,
        room_id: 3,
        user_id: 7,
        trip_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        checkin: '2020-10-15',
        checkout: '2020-10-20',
        accommodation_id: 1,
        room_id: 3,
        user_id: 7,
        trip_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Bookings', null, {})
};
