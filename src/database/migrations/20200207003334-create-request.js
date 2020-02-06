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
<<<<<<< HEAD:src/database/migrations/20200206110240-create-request.js
    return_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
=======
>>>>>>> ft(Approve request): Avil request for approval:src/database/migrations/20200207003334-create-request.js
    accommodation_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'CASCADE',
      references: {
<<<<<<< HEAD:src/database/migrations/20200206110240-create-request.js
        model: 'Accommodations',
=======
        model: 'Accommodation',
>>>>>>> ft(Approve request): Avil request for approval:src/database/migrations/20200207003334-create-request.js
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
<<<<<<< HEAD:src/database/migrations/20200206110240-create-request.js
      allowNull: false,
=======
>>>>>>> ft(Approve request): Avil request for approval:src/database/migrations/20200207003334-create-request.js
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
