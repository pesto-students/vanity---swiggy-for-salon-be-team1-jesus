const service = require('../../domain/models/service');

module.exports = ({ database }) => {
  const add = async (service, t) => {
    const data = toDatabase(service);
    const new_service = await database.models.service.create(data, {
      transaction: t,
    });

    return toDomain(new_service);
  };

  const getAll = async (salon, t) => {
    const new_service = await database.models.service.findAll({
      where: { salonId: salon.salonId },
      transaction: t,
    });

    const svcs = [];
    new_service.forEach((svc) => svcs.push(svc.dataValues.service));
    let uniqueServices = [...new Set(svcs)];

    let services = new_service.map((k) => toDomain(k));
    const data = [];
    for (let i = 0; i < uniqueServices.length; i++) {
      const results = services.filter(
        (entry) => entry.service === uniqueServices[i]
      );
      const svs = {
        service: uniqueServices[i],
        subservice: results,
      };
      data.push(svs);
    }
    return data;
  };

  const toDomain = ({ dataValues }) => {
    return new service({
      serviceId: dataValues.serviceId,
      service: dataValues.service,
      subservice: dataValues.subservice,
      price: dataValues.price,
      time: dataValues.time,
      salonId: dataValues.salonId,
    });
  };

  const toDatabase = (entity) => {
    return {
      serviceId: entity.serviceId,
      service: entity.service,
      subservice: entity.subservice,
      price: entity.price,
      time: entity.time,
      salonId: entity.salonId,
    };
  };

  return {
    add,
    getAll,
  };
};
