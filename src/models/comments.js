export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    request_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.STRING,
      defaultValue: false,
      allowNull: false
    }
  },
  {});
  Comment.associate = (models) => {
    Comment.belongsTo(models.Request, {
      foreignKey: 'request_id',
      onDelete: 'CASCADE'
    });
    // Comment.belongsTo(models.User, {
    //   foreignKey: 'user_id',
    //   onDelete: 'CASCADE'
    // });
  };
  return Comment;
};
