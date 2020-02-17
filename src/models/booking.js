export default (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    'Booking',
    {
      checkin: {
        type: DataTypes.DATE,
        allowNull: false
      },
      checkout: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {}
  );
  Booking.associate = models => {
    Booking.belongsTo(models.User, { foreignKey: 'user_id' });
    Booking.belongsTo(models.Accommodation, { foreignKey: 'accommodation_id' });
    Booking.belongsTo(models.Room, { foreignKey: 'room_id' });
    Booking.belongsTo(models.Request, { foreignKey: 'trip_id' });
  };
  return Booking;
};
