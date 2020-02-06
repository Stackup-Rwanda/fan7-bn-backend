export default (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});

  Accommodation.associate = models => {
    Accommodation.hasMany(models.Request, { foreignKey: 'accommodation_id', as: 'requests' });
  };

  return Accommodation;
};
