export default (sequelize, DataTypes) => {
  const Request = sequelize.define(
    'Request',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      passportName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      passportNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        allowNull: true,
        type: DataTypes.DATE
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      travel_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
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
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
      },
    },
    {}
  );

  Request.associate = models => {
    Request.belongsTo(models.Accommodation, {
      foreignKey: 'accommodation_id',
      onDelete: 'CASCADE'
    });
  };
  return Request;
};
