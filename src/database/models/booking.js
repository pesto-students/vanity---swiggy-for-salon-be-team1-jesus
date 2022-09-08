module.exports = function (sequelize, DataTypes) {
  const Booking = sequelize.define(
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
      serviceIds: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.INTEGER,
      },
      bookingStatus: {
        type: DataTypes.STRING,
      },
      paymentStatus: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'booking',
    }
  );

  //sequalize associations that belongs to some other database model
  Booking.associate = (models) => {
    Booking.belongsTo(models.salon, {
      onDelete: 'CASCADE',
      foreignKey: 'salonId',
    });
    Booking.belongsTo(models.user, {
      onDelete: 'CASCADE',
      foreignKey: 'userId',
    });
    Booking.belongsTo(models.staff, {
      onDelete: 'CASCADE',
      foreignKey: 'staffId',
    });
  };

  return Booking;
};
