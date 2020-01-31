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
      type: Sequelize.STRING
    },
    role: {
      allowNull: true,
      type: Sequelize.STRING,
      defaultValue: 'requester'
    },
    gender: {
      allowNull: true,
      type: Sequelize.STRING
    },
    dob: {
      allowNull: true,
      type: Sequelize.DATE
    },
    phone: {
      allowNull: true,
      type: Sequelize.STRING
    },
    address: {
      allowNull: true,
      type: Sequelize.STRING
    },
    country: {
      allowNull: true,
      type: Sequelize.STRING
    },
    prefered_language: {
      allowNull: true,
      type: Sequelize.STRING
    },
    prefered_currency: {
      allowNull: true,
      type: Sequelize.STRING
    },
    image_url: {
      allowNull: true,
      type: Sequelize.STRING
    },
    company: {
      allowNull: true,
      type: Sequelize.STRING
    },
    department: {
      allowNull: true,
      type: Sequelize.STRING
    },
    line_manager: {
      allowNull: true,
      type: Sequelize.STRING
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
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
