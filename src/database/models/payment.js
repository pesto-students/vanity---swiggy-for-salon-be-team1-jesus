module.exports = function (sequelize, DataTypes) {
  const Payment = sequelize.define(
    'payment',
    {
      paymentId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      paymentDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'payment',
    }
  );

  Payment.associate = (models) => {
    Payment.belongsTo(models.booking, {
      onDelete: 'CASCADE',
      foreignKey: 'bookingId',
    });
  };

  return Payment;
};
