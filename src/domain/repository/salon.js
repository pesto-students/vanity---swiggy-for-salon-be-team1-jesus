const Salon = require('../../domain/models/salon');
const { Op } = require('sequelize');

module.exports = ({ database }) => {
  const add = async (salon, t) => {
    const data = toDatabase(salon);

    // Add new salon entry in salon database
    const new_salon = await database.models.salon.create(data, {
      transaction: t,
    });
    return toDomain(new_salon);
  };

  const getAll = async (query, t) => {
    // Read all parameters provided to filter the salons data
    const city = query.city;
    const bestFor = query.bestFor;
    const rating = query.rating || 0;
    const services = query.services ? query.services.split(',') : undefined;
    const budgetSort = query.budgetSort;
    const ratingSort = query.ratingSort;
    let limit = query.size;
    let offset = 0 + (query.page - 1) * limit;

    // declare our query options
    const options = {
      order: [],
      where: {
        rating: {
          [Op.gte]: rating,
        },
      },
      limit: +limit,
      offset: offset,
      transaction: t,
    };

    // if parameter has a value (!== undefined), include it in the query
    if (city !== undefined) options.where.city = city;
    if (bestFor !== undefined) options.where.bestFor = bestFor;
    if (budgetSort !== undefined) options.order.push(['avgCost', budgetSort]);
    if (ratingSort !== undefined) options.order.push(['rating', ratingSort]);

    // filtered query
    let new_salon = await database.models.salon.findAndCountAll(options);

    /**
     * Filter all the salons that contains required services
     * If services are present then add the salon data in filteredSalons array
     */
    let salons;
    if (services !== undefined) {
      const filteredSalons = [];
      for (let i = 0; i < new_salon.rows.length; i++) {
        if (
          services.every((s) =>
            new_salon.rows[i].dataValues.services.includes(s)
          )
        ) {
          filteredSalons.push(new_salon.rows[i]);
        }
      }

      // Map all the salons data together
      salons = filteredSalons.map((k) => toDomain(k));
    } else {
      // If services filter is not present the return the origin salons data
      salons = new_salon.rows.map((k) => toDomain(k));
    }
    return salons;
  };

  const search = async (query, t) => {
    const name = query.name;
    let limit = query.size;
    let offset = 0 + (query.page - 1) * limit;

    //Search salon with some name present in salon name
    const new_salon = await database.models.salon.findAll({
      where: {
        name: {
          [Op.regexp]: name || ' ',
        },
      },
      limit: +limit,
      offset: offset,
      transaction: t,
    });

    // Map all the salons data together
    let salons = new_salon.map((k) => toDomain(k));
    return salons;
  };

  //Validate the salons data
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

  // Add the data
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
    search,
  };
};
