module.exports = function (sequelize, DataTypes) {
  const staff = sequelize.define(
    'staff',
    {
      staffId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'staff',
    }
  );

  staff.associate = (models) => {
    staff.belongsTo(models.salon, {
      onDelete: 'CASCADE',
      foreignKey: 'salonId',
    });
  };

  return staff;
};
