export default {
  up: queryInterface => queryInterface.bulkInsert('Accommodation', [
    {
      user_id: 14,
      name: 'John Doe',
      address: 'rwanda, kigali',
      image: ['uiqwgriqw.png', 'kgywd.png'],
      geo_location: '10.84854, 20.234708',
      services: ['conference hall', 'entertainment'],
      amenities: ['WIFI', 'WIFI'],
      description: 'Good',
      status: 'Pending'
    },
    {
      user_id: 14,
      name: 'serena hotel',
      address: 'rwanda, kigali',
      image: ['uiqwgriqw.png', 'kgywd.png'],
      geo_location: '10.84854, 20.234708',
      services: ['conference hall', 'entertainment'],
      amenities: ['WIFI', 'WIFI'],
      description: 'Good',
      status: 'Approved'
    },
    {
      user_id: 14,
      name: 'serena hotel',
      address: 'rwanda, kigali',
      image: ['uiqwgriqw.png', 'kgywd.png'],
      geo_location: '10.84854, 20.234708',
      services: ['conference hall', 'entertainment'],
      amenities: ['WIFI', 'WIFI'],
      description: 'Good',
      status: 'Approved'
    },
    {
      user_id: 14,
      name: 'serena hotel',
      address: 'rwanda, kigali',
      image: ['uiqwgriqw.png', 'kgywd.png'],
      geo_location: '10.84854, 20.234708',
      services: ['conference hall', 'entertainment'],
      amenities: ['WIFI', 'WIFI'],
      description: 'Good',
      status: 'Pending'
    }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Accommodation', null, {})
};
