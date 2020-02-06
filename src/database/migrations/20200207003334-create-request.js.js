export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Requests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'user_id',
      },
    },
    passportName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    passportNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true
    },
    dob: {
      allowNull: true,
      type: Sequelize.DATE
    },
    origin: {
      type: Sequelize.STRING,
      allowNull: true
    },
    destination: {
      type: Sequelize.STRING,
      allowNull: true
    },
    travel_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    return_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    accommodation_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'CASCADE',
      references: {
        model: 'Accommodations',
        key: 'id',
        as: 'accommodation_id',
      },
    },
    reason: {
      type: Sequelize.STRING,
      allowNull: true
    },
    isApproved: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'Pending'
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
    }
  }),
  down: queryInterface => queryInterface.dropTable('Requests')
};
