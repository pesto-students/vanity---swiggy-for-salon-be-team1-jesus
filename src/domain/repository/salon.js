const Salon = require('../../domain/models/salon');

module.exports = ({ database }) => {
  const add = async (salon, t) => {
    const data = toDatabase(salon);

    const new_salon = await database.models.salon.create(data, {
      transaction: t,
    });
    return toDomain(new_salon);
  };

  const getAll = async (salon, t) => {
    const new_salon = await database.models.salon.findAll({
      transaction: t,
    });

    let salons = new_salon.map((k) => toDomain(k));
    return salons;
  };

  const getFew = async (salon, t) => {
    const new_salon = await database.models.salon.findAll({
      where: { City: salon.City },
      transaction: t,
    });

    let salons = new_salon.map((k) => toDomain(k));
    return salons;
  };

  const toDomain = ({ dataValues }) => {
    return new Salon({
      SalonId: dataValues.SalonId,
      Name: dataValues.Name,
      Address: dataValues.Address,
      City: dataValues.City,
      Pincode: dataValues.Pincode,
      State: dataValues.State,
      OwnerName: dataValues.OwnerName,
      OwnerQuote: dataValues.OwnerQuote,
      ManPower: dataValues.ManPower,
      Rating: dataValues.Rating,
      BestFor: dataValues.BestFor,
      Contact: dataValues.Contact,
    });
  };

  const toDatabase = (entity) => {
    return {
      SalonId: entity.SalonId,
      Name: entity.Name,
      Address: entity.Address,
      City: entity.City,
      Pincode: entity.Pincode,
      State: entity.State,
      OwnerName: entity.OwnerName,
      OwnerQuote: entity.OwnerQuote,
      ManPower: entity.ManPower,
      Rating: entity.Rating,
      BestFor: entity.BestFor,
      Contact: entity.Contact,
    };
  };

  return {
    add,
    getAll,
    getFew,
  };
};
