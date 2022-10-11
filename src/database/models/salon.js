module.exports = function (sequelize, DataTypes) {
  const Salon = sequelize.define(
    'salon',
    {
      salonId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pincode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          checkLength(value) {
            if (value.length > 100000 && value.length < 999999) {
              throw new Error('Pincode must be 6 digits!');
            }
          },
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerQuote: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manPower: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bestFor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      services: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      avgCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          checkLength(value) {
            if (value.length != 10) {
              throw new Error('Phone number must be 10 digits!');
            }
          },
        },
      },
    },
    {
      tableName: 'salon',
    }
  );
  return Salon;
};
