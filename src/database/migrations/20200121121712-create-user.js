export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
      allowNull: true,
      unique: true,
      type: Sequelize.STRING
    },
    password: {
      allowNull: true,
      type: Sequelize.STRING
    },
    first_name: {
      allowNull: true,
      type: Sequelize.STRING
    },
    last_name: {
      allowNull: true,
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
    social_id: {
      allowNull: true,
      type: Sequelize.STRING
    },
    provider: {
      allowNull: true,
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

  down: queryInterface => queryInterface.dropTable('Users')
};
