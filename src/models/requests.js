export default (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });

  Request.associate = (models) => {
    Request.hasMany(models.Comment, {
      foreignKey: 'request_id',
      onDelete: 'CASCADE'
    });
    Request.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
  };

  return Request;
};
