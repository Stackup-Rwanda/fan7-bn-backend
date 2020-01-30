export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
    password: {
      allowNull: true,
      type: Sequelize.STRING
    },
    first_name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    last_name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    user_name: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
    role: {
      allowNull: true,
      type: Sequelize.STRING,
      defaultValue: 'requester'
    },
    isVerified: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
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

  down: queryInterface => queryInterface.dropTable('Users')
};
