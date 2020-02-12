export default (sequelize, DataTypes) => {
  const Feedback = sequelize.define(
    'Feedback', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },
      accommodation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },
      feedback: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {}
  );

  Feedback.associate = (models) => {
    Feedback.belongsTo(models.Accommodation, {
      foreignKey: 'accommodation_id',
      onDelete: 'CASCADE'
    });
    Feedback.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
  };
  return Feedback;
};
