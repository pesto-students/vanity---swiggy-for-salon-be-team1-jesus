const { attributes } = require('structure');

const Service = attributes({
  serviceId: { type: String, required: true, exactLength: 40 },
  service: { type: String, required: true },
  subservice: { type: Object, required: true },
  price: { type: Number, required: true },
  time: { type: String, required: true },
  salonId: { type: String, required: true },
})(class Service {});

module.exports = Service;
