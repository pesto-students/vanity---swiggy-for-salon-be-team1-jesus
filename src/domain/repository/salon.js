const Salon = require('../../domain/models/salon');
const { Op } = require('sequelize');

module.exports = ({ database }) => {
  const add = async (salon, t) => {
    const data = toDatabase(salon);

    const new_salon = await database.models.salon.create(data, {
      transaction: t,
    });
    return toDomain(new_salon);
  };

  const getAll = async (query, t) => {
    const city = query.city;
    const bestFor = query.bestFor || 'Unisex';
    const rating = query.rating || 0;
    const services = query.services ? query.services.split(',') : false;
    let limit = query.size;
    let offset = 0 + (query.page - 1) * limit;
    const new_salon = await database.models.salon.findAndCountAll({
      where: {
        city,
        bestFor,
        rating: {
          [Op.gte]: rating,
        },
        // services: {
        //   [Op.or]: services,
        // },
      },
      limit: +limit,
      offset: offset,
      transaction: t,
    });
    console.log(new_salon);

    let salons = new_salon.rows.map((k) => toDomain(k));
    return salons;
  };

  const salonGet = async (query, t) => {
    const serchByKey = Object.keys(query);
    const serchByValue = Object.values(query);
    const new_salon = await database.models.salon.findAll({
      where: { [serchByKey]: [serchByValue] },
      transaction: t,
    });

    let salons = new_salon.map((k) => toDomain(k));
    return salons;
  };

  const toDomain = ({ dataValues }) => {
    return new Salon({
      salonId: dataValues.salonId,
      name: dataValues.name,
      address: dataValues.address,
      city: dataValues.city,
      pincode: dataValues.pincode,
      state: dataValues.state,
      ownerName: dataValues.ownerName,
      ownerQuote: dataValues.ownerQuote,
      manPower: dataValues.manPower,
      services: dataValues.services,
      rating: dataValues.rating,
      bestFor: dataValues.bestFor,
      avgCost: dataValues.avgCost,
      contact: dataValues.contact,
    });
  };

  const toDatabase = (entity) => {
    return {
      salonId: entity.salonId,
      name: entity.name,
      address: entity.address,
      city: entity.city,
      pincode: entity.pincode,
      state: entity.state,
      ownerName: entity.ownerName,
      ownerQuote: entity.ownerQuote,
      manPower: entity.manPower,
      services: entity.services,
      rating: entity.rating,
      bestFor: entity.bestFor,
      avgCost: entity.avgCost,
      contact: entity.contact,
    };
  };

  return {
    add,
    getAll,
    salonGet,
  };
};
