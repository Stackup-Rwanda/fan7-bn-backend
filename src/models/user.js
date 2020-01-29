export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter your Username'
          },
          notEmpty: {
            args: true,
            msg: 'Username is not allowed to be empty'
          }
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'requester'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      social_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );

  return User;
};
