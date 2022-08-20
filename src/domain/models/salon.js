const { attributes } = require('structure');

const Salon = attributes({
  SalonId: { type: String, required: true },
  Name: { type: String, required: true },
  Address: { type: String, required: true },
  City: { type: String, required: true },
  Pincode: { type: Number, required: true },
  State: { type: String, required: true },
  OwnerName: { type: String, required: true },
  OwnerQuote: { type: String, required: true },
  ManPower: { type: Number, required: true },
  Rating: { type: Number, required: true },
  BestFor: { type: String, required: true },
  Contact: { type: String, required: true },
})(class Salon {});

module.exports = Salon;
