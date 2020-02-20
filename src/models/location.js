export default (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      visit_count: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  return Location;
};
