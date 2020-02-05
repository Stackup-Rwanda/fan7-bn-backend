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
    from: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    to: {
      allowNull: false,
      type: Sequelize.STRING
    },
    travelTime: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    reason: {
      allowNull: false,
      type: Sequelize.STRING
    },
    accomodation: {
      allowNull: false,
      type: Sequelize.STRING
    },
    isApproved: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
