export default (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      visitCount: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  return Location;
};
