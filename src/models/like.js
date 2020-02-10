export default (sequelize, DataTypes) => {
  const Like = sequelize.define(
    'Like', {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      accommodation_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    },
    {}
  );

  Like.associate = (models) => {
    Like.belongsTo(models.Accommodation, {
      foreignKey: 'accommodation_id',
      onDelete: 'CASCADE'
    });
    Like.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
  };
  return Like;
};
