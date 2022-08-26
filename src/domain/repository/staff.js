const Staff = require('../../domain/models/staff');
const bcrypt = require('bcrypt');

module.exports = ({ database }) => {
  const add = async (staff, t) => {
    const data = toDatabase(staff);

    const new_staff = await database.models.staff.create(data, {
      transaction: t,
    });

    return toDomain(new_staff);
  };

  const getAll = async (staff, t) => {
    console.log(staff);
    const new_staff = await database.models.staff.findAll({
      where: { salonId: staff.salonId },
      transaction: t,
    });

    let staffs = new_staff.map((k) => toDomain(k));
    return staffs;
  };

  const toDomain = ({ dataValues }) => {
    return new Staff({
      staffId: dataValues.staffId,
      name: dataValues.name,
      role: dataValues.role,
      salonId: dataValues.salonId,
    });
  };

  const toDatabase = (entity) => {
    return {
      staffId: entity.staffId,
      name: entity.name,
      role: entity.role,
      salonId: entity.salonId,
    };
  };

  return {
    add,
    getAll,
  };
};
