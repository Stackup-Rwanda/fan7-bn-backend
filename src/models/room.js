export default (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    booked: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    room_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    total_bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  }, {});
  Room.associate = (models) => {
    Room.belongsTo(models.Accommodation, { foreignKey: 'accommodation_id' });
  };
  return Room;
};
