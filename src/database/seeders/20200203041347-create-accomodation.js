export default {
  up: queryInterface => queryInterface.bulkInsert('Accommodation', [
    {
      user_id: 11,
      name: 'John Doe',
      address: 'rwanda, kigali',
      rooms: 56,
      image: ['uiqwgriqw.png', 'kgywd.png'],
      geo_location: '10.84854, 20.234708',
      services: ['conference hall', 'entertainment'],
      amenities: ['WIFI', 'WIFI'],
      description: 'Good'
    },
    {
      user_id: 11,
      name: 'serena hotel',
      address: 'rwanda, kigali',
      rooms: 34,
      image: ['uiqwgriqw.png', 'kgywd.png'],
      geo_location: '10.84854, 20.234708',
      services: ['conference hall', 'entertainment'],
      amenities: ['WIFI', 'WIFI'],
      description: 'Good'
    }], {}),

  down: queryInterface => queryInterface.bulkDelete('Accommodation', null, {})
};
