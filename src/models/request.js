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
      from: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      to: {
        allowNull: false,
        type: DataTypes.STRING
      },
      travelTime: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      reason: {
        allowNull: false,
        type: DataTypes.STRING
      },
      accomodation: {
        allowNull: true,
        type: DataTypes.STRING
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

  return Request;
};
