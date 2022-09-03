const { attributes } = require('structure');

const Salon = attributes({
  salonId: { type: String, required: true, exactLength: 40 },
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: Number, required: true },
  state: { type: String, required: true },
  ownerName: { type: String, required: true },
  ownerQuote: { type: String, required: true },
  manPower: { type: Number, required: true },
  services: { type: Object, required: true },
  rating: { type: Number, required: true },
  bestFor: { type: String, required: true },
  avgCost: { type: Number, required: true },
  contact: { type: String, required: true },
})(class Salon {});

module.exports = Salon;
