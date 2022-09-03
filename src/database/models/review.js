module.exports = function (sequelize, DataTypes) {
  const Review = sequelize.define(
    'review',
    {
      reviewId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'review',
    }
  );

  Review.associate = (models) => {
    Review.belongsTo(models.salon, {
      onDelete: 'CASCADE',
      foreignKey: 'salonId',
    });

    Review.belongsTo(models.user, {
      onDelete: 'CASCADE',
      foreignKey: 'userId',
    });
  };

  return Review;
};
