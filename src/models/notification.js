export default (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    user_id: DataTypes.INTEGER,
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
    // associations can be defined here
    Notification.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return Notification;
};
