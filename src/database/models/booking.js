module.exports = function (sequelize, DataTypes) {
  const Service = sequelize.define(
    'booking',
    {
      bookingId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      bookingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      services: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookingStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.STRING,
      },
      staffName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'booking',
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
