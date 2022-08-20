module.exports = function (sequelize, DataTypes) {
  const Salon = sequelize.define(
    'salon',
    {
      SalonId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      City: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Pincode: {
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
      State: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      OwnerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      OwnerQuote: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ManPower: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      BestFor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Contact: {
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
