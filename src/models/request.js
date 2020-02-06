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
      userId: {
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
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dob: {
        allowNull: true,
        type: DataTypes.DATE
      },
      origin: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      destination: {
        allowNull: false,
        type: DataTypes.STRING
      },
      travelDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      reason: {
        allowNull: false,
        type: DataTypes.STRING
      },
      accommodation_id: {
        allowNull: true,
        type: DataTypes.NUMBER
      },
      isApproved: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'pending'
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

  return Request;
};
