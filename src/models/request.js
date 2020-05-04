export default (sequelize, DataTypes) => {
  const Request = sequelize.define(
    'Request',
    {
      id: {
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'user_id',
        },
      },
      passportName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      passportNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: true
      },
      destination: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      travel_date: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      return_date: {
        type: DataTypes.STRING,
        allowNull: true
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'reason is not allowed to be empty'
          }
        }
      },
      isApproved: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending',
        validate: {
          isIn: {
            args: [['Pending', 'Approved', 'Rejected']],
            msg: 'Invalid Status, uses Pending, Approved or Rejected only'
          }
        }
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isIn: {
            args: [['oneway', 'multiCity', 'returnTrip']],
            msg: 'Invalid option'
          }
        }
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    }, {}
  );
  Request.associate = models => {
    Request.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Request.hasMany(models.Notification, { foreignKey: 'request_id', as: 'notifications' });
  };

  return Request;
};
