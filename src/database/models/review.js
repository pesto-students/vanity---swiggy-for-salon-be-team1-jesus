module.exports = function (sequelize, DataTypes) {
  const Service = sequelize.define(
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

  Service.associate = (models) => {
    Service.belongsTo(models.salon, {
      onDelete: 'CASCADE',
      foreignKey: 'salonId',
    });

    Service.belongsTo(models.user, {
      onDelete: 'CASCADE',
      foreignKey: 'userId',
    });
  };

  return Service;
};
