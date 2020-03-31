export default (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    geo_location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    services: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending',
      validate: {
        isIn: {
          args: [
            ['Pending', 'Approved']
          ],
          msg: 'Invalid Status, uses Pending, Approved or Rejected only'
        }
      }
    },
  }, {});
  Accommodation.associate = models => {
    Accommodation.hasMany(models.Feedback, { foreignKey: 'accommodation_id', as: 'feedbacks' });
    Accommodation.hasMany(models.Room, { foreignKey: 'accommodation_id', as: 'rooms' });
    Accommodation.belongsTo(models.User, { foreignKey: 'user_id' });
    Accommodation.hasMany(models.Like, {
      foreignKey: 'accommodation_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Accommodation;
};
