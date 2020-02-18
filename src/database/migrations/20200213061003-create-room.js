export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Rooms', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    accommodation_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Accommodation',
        key: 'id',
        as: 'accommodation_id',
      },
    },
    booked: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    cost: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    area: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    room_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    },
    total_bedrooms: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    amenities: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
    },
    image: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('Rooms')
};
