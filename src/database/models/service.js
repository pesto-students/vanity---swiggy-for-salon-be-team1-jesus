module.exports = function (sequelize, DataTypes) {
  const Service = sequelize.define(
    'service',
    {
      serviceId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      service: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subservice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      tableName: 'service',
    }
  );

  Service.associate = (models) => {
    Service.belongsTo(models.salon, {
      onDelete: 'CASCADE',
      foreignKey: 'salonId',
    });
  };

  return Service;
};
