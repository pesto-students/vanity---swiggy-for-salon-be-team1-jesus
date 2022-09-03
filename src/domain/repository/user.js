const User = require('../../domain/models/user');
const bcrypt = require('bcrypt');

module.exports = ({ database }) => {
  const add = async (user, t) => {
    const data = toDatabase(user);

    const new_user = await database.models.user.create(data, {
      transaction: t,
    });

    return toDomain(new_user);
  };

  const getAll = async (user, t) => {
    let limit = user.size;
    let offset = 0 + (user.page - 1) * limit;
    const new_user = await database.models.user.findAndCountAll({
      limit: +limit,
      offset: offset,
      transaction: t,
    });

    let users = new_user.rows.map((k) => toDomain(k));
    return users;
  };

  const login = async (data, t) => {
    const new_user = await database.models.user.findOne({
      where: { email: data.email },
      transaction: t,
    });

    const { dataValues } = new_user;
    let bool = bcrypt.compareSync(data.password, dataValues.password);
    if (!bool) throw new Error('Password is wrong!');
    return toDomain(new_user);
  };

  const toDomain = ({ dataValues }) => {
    return new User({
      userId: dataValues.userId,
      name: dataValues.name,
      email: dataValues.email,
      password: dataValues.password,
      phone: dataValues.phone,
      city: dataValues.city,
      gender: dataValues.gender,
      rating: dataValues.rating,
    });
  };

  const toDatabase = (entity) => {
    return {
      userId: entity.userId,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      phone: entity.phone,
      city: entity.city,
      gender: entity.gender,
      rating: entity.rating,
    };
  };

  return {
    add,
    getAll,
    login,
  };
};
