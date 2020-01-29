export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email already exists'
        },
        validate: {
          notNull: {
            msg: 'Please enter your email address'
          },
          isEmail: {
            msg: 'Email address must be valid'
          },
          notEmpty: {
            args: true,
            msg: 'Email is not allowed to be empty'
          }
        }
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter your First Name'
          },
          len: {
            args: 3,
            msg: 'First Name must be atleast 3 characters in length'
          },
          notEmpty: {
            args: true,
            msg: 'First Name is not allowed to be empty'
          }
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter your Last Name'
          },
          len: {
            args: 3,
            msg: 'Last Name must be atleast 3 characters in length'
          },
          notEmpty: {
            args: true,
            msg: 'Last Name is not allowed to be empty'
          }
        }
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
        validate: {
          len: {
            args: 8,
            msg: 'Password must be atleast 8 characters in length'
          },
          notEmpty: {
            args: true,
            msg: 'Password is not allowed to be empty'
          }
        }
      }
    },
    {}
  );

  return User;
};
