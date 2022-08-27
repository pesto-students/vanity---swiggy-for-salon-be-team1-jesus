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

  const getAll = async (query, t) => {
    let salonId = query.salonId;
    let role = query.role;

    let condition1 = salonId ? { salonId: salonId } : null;
    let condition2 = role ? { role: role } : null;

    const new_staff = await database.models.staff.findAll({
      where: [condition1, condition2],
      transaction: t,
    });

    if (!new_staff) {
      return new Error('Enter correct salonId');
    }

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
