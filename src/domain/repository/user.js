const User = require('../../domain/models/user');
const bcrypt = require('bcrypt');

module.exports = ({ database }) => {
  const add = async (user, t) => {
    const data = toDatabase(user);

    // inset into table user (1,2,3,4) raw query
    const new_user = await database.models.user.create(data, {
      transaction: t,
    });

    return toDomain(new_user); // convert / serailize data a/t user friendlay
  };

  const getAll = async (user, t) => {
    const new_user = await database.models.user.findAll({
      //   where: constraint,
      transaction: t,
    });

    let users = new_user.map((k) => toDomain(k));
    return users;
  };

  const getOne = async (user, t) => {
    const new_user = await database.models.user.findOne({
      where: { Email: user.Email },
      transaction: t,
    });

    const { dataValues } = new_user;
    let bool = bcrypt.compareSync(user.Password, dataValues.Password);
    if (!bool) return toDomain(null);
    return toDomain(new_user);
  };

  const toDomain = ({ dataValues }) => {
    return new User({
      UserId: dataValues.UserId,
      Name: dataValues.Name,
      Email: dataValues.Email,
      Password: dataValues.Password,
      Phone: dataValues.Phone,
      City: dataValues.City,
      Gender: dataValues.Gender,
      Rating: dataValues.Rating,
    });
  };

  const toDatabase = (entity) => {
    return {
      UserId: entity.UserId,
      Name: entity.Name,
      Email: entity.Email,
      Password: entity.Password,
      Phone: entity.Phone,
      City: entity.City,
      Gender: entity.Gender,
      Rating: entity.Rating,
    };
  };

  return {
    add,
    getAll,
    getOne,
  };
};
