const User = require('../../domain/models/user');
const bcrypt = require('bcrypt');

module.exports = ({ database }) => {
  const add = async (user, t) => {
    const data = toDatabase(user);

    //Add new user entry in user database
    const new_user = await database.models.user.create(data, {
      transaction: t,
    });

    return toDomain(new_user);
  };

  const getAll = async (user, t) => {
    //Pagination logic
    let limit = user.size;
    let offset = 0 + (user.page - 1) * limit;

    // Get the users data and pass the data with pagination
    const new_user = await database.models.user.findAndCountAll({
      limit: +limit,
      offset: offset,
      transaction: t,
    });

    //Map all the users data
    let users = new_user.rows.map((userData) => toDomain(userData));
    return users;
  };

  const login = async (data, t) => {
    //Search user with email
    const new_user = await database.models.user.findOne({
      where: { email: data.email },
      transaction: t,
    });

    if (!new_user) throw new Error('EmailNotFound');
    //Comapare the password with hashed value
    const { dataValues } = new_user;
    let bool = bcrypt.compareSync(data.password, dataValues.password);
    if (!bool) throw new Error('PasswordNotMatch');
    return toDomain(new_user);
  };

  //Validate the data provide by user
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

  //Store the data
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
