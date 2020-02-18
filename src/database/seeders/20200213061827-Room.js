export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Rooms',
    [
      {
        area: 3,
        cost: 56.7,
        total_bedrooms: 2,
        type: 'standard',
        room_number: 1236,
        amenities: ['fhgjk', 'fghj'],
        accommodation_id: 1,
        booked: false,
        image: [
          'http://res.cloudinary.com/elvis-rugamba/image/upload/v1581862917/pdwwtoha6r0jcoldvfuj.png',
          'http://res.cloudinary.com/elvis-rugamba/image/upload/v1581862924/umgonemdhtar3yf14lua.png'
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cost: 56.7,
        total_bedrooms: 2,
        area: 3,
        type: 'standard',
        room_number: 1234,
        amenities: ['fhgjk', 'fghj'],
        accommodation_id: 1,
        booked: false,
        image: [
          'http://res.cloudinary.com/elvis-rugamba/image/upload/v1581862917/pdwwtoha6r0jcoldvfuj.png',
          'http://res.cloudinary.com/elvis-rugamba/image/upload/v1581862924/umgonemdhtar3yf14lua.png'
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cost: 56.7,
        total_bedrooms: 2,
        area: 3,
        type: 'standard',
        room_number: 1237,
        amenities: ['fhgjk', 'fghj'],
        accommodation_id: 1,
        booked: false,
        image: [
          'http://res.cloudinary.com/elvis-rugamba/image/upload/v1581862917/pdwwtoha6r0jcoldvfuj.png',
          'http://res.cloudinary.com/elvis-rugamba/image/upload/v1581862924/umgonemdhtar3yf14lua.png'
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cost: 56.7,
        total_bedrooms: 2,
        area: 3,
        type: 'standard',
        room_number: 1239,
        amenities: ['fhgjk', 'fghj'],
        accommodation_id: 1,
        booked: false,
        image: [
          'http://res.cloudinary.com/elvis-rugamba/image/upload/v1581862917/pdwwtoha6r0jcoldvfuj.png',
          'http://res.cloudinary.com/elvis-rugamba/image/upload/v1581862924/umgonemdhtar3yf14lua.png'
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Rooms', null, {})
};
