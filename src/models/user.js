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
        allowNull: true,
      },
      gender: {
        allowNull: true,
        type: DataTypes.STRING
      },
      dob: {
        allowNull: true,
        type: DataTypes.DATE
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING
      },
      address: {
        allowNull: true,
        type: DataTypes.STRING
      },
      country: {
        allowNull: true,
        type: DataTypes.STRING
      },
      prefered_language: {
        allowNull: true,
        type: DataTypes.STRING
      },
      prefered_currency: {
        allowNull: true,
        type: DataTypes.STRING
      },
      image_url: {
        allowNull: true,
        type: DataTypes.STRING
      },
      social_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: true
      },
      company: {
        allowNull: true,
        type: DataTypes.STRING
      },
      department: {
        allowNull: true,
        type: DataTypes.STRING
      },
      line_manager: {
        allowNull: true,
        type: DataTypes.STRING
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      rememberMe: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      emailNotification: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );
  User.associate = models => {
    User.hasMany(models.Request, {
      foreignKey: 'user_id',
      as: 'user_id',
      onDelete: 'CASCADE'
    });
  };
  User.associate = models => {
    User.hasMany(models.Notification, { foreignKey: 'user_id', as: 'notifications' });
    User.hasMany(models.Request, { foreignKey: 'user_id', as: 'requests' });
    User.hasMany(models.Feedback, { foreignKey: 'user_id', as: 'feedbacks' });
  };

  return User;
};
