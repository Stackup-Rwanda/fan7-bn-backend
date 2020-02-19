export default (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    'Chat',
    {
      senderId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      sender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      receiver: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'general'
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  return Chat;
};
