module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    'user',
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Please enter correct mail address',
          },
        },
      },
      phone: {
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'user',
    }
  );
  return User;
};
