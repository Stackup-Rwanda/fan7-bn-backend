export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Accommodation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    },
    geo_location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    rooms: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    services: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    },
    amenities: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Pending',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    },
  }),

  down: queryInterface => queryInterface.dropTable('Accommodation')
};
