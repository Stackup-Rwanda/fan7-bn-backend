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
    rooms: {
      type: DataTypes.INTEGER,
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
          args: [['Pending', 'Approved']],
          msg: 'Invalid Status, uses Pending, Approved or Rejected only'
        }
      }
    },
  }, {});

  Accommodation.associate = models => {
    Accommodation.hasMany(models.Request, { foreignKey: 'accommodation_id', as: 'requests' });
    Accommodation.hasMany(models.Feedback, { foreignKey: 'accommodation_id', as: 'feedbacks' });
  };

  return Accommodation;
};
