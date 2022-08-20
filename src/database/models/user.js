module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    'user',
    {
      UserId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Please enter correct mail address',
          },
        },
      },
      Phone: {
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
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      City: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      tableName: 'user',
    }
  );
  return User;
};
