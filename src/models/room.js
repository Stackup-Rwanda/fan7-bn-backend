export default (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accommodation_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    booked: {
      type: DataTypes.BOOLEAN,
      default: false
    },
  }, {});
  Room.associate = (models) => {
    Room.belongsTo(models.Accommodation, { foreignKey: 'accommodation_id' });
  };
  return Room;
};
