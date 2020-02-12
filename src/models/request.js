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
      accommodation_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Accommodations',
          key: 'id',
          as: 'accommodation_id'
        }
      },
      passportName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      passportNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      dob: {
        allowNull: true,
        type: DataTypes.DATE
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: true
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: true
      },
      travel_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      return_date: {
        type: DataTypes.DATE,
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
    Request.belongsTo(models.Accommodation, { foreignKey: 'accommodation_id' });
    Request.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Request;
};
