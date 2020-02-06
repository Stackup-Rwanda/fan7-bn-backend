export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Requests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    passportName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    passportNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dob: {
      allowNull: true,
      type: Sequelize.DATE
    },
    origin: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    destination: {
      allowNull: false,
      type: Sequelize.STRING
    },
    travelDate: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    reason: {
      allowNull: false,
      type: Sequelize.STRING
    },
    accommodation_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    isApproved: {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'pending'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE
    },
  }),

  down: queryInterface => queryInterface.dropTable('Requests')
};
