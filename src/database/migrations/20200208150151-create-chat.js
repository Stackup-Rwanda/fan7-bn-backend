export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Chats', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    senderId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    sender: {
      allowNull: false,
      unique: false,
      type: Sequelize.STRING
    },
    receiver: {
      allowNull: false,
      unique: false,
      type: Sequelize.STRING
    },
    message: {
      allowNull: false,
      unique: false,
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    },
  }),

  down: queryInterface => queryInterface.dropTable('Chats')
};
