export default (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    user_id: DataTypes.INTEGER,
    request_id: DataTypes.INTEGER,
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unread',
      validate: {
        isIn: {
          args: [['unread', 'read']],
          msg: 'Notification status can either be read or unread.'
        }
      }
    }
  }, {});
  Notification.associate = (models) => {
    Notification.belongsTo(models.User, { foreignKey: 'user_id' });
    Notification.belongsTo(models.Request, { foreignKey: 'request_id' });
  };
  return Notification;
};
