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
    origin: {
      type: Sequelize.STRING,
      allowNull: true
    },
    destination: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    },
    travel_date: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    },
    return_date: {
      type: Sequelize.STRING,
      allowNull: true
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
      allowNull: false,
      defaultValue: 'Pending'
    },
    type: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isIn: {
          args: [['oneway', 'multiCity', 'returnTrip']],
          msg: 'Invalid option'
        }
      }
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
