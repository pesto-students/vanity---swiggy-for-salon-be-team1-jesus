const { attributes } = require('structure');

const User = attributes({
  UserId: { type: String, required: true },
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Phone: { type: String, required: true },
  Password: { type: String, required: true },
  City: { type: String },
  Gender: { type: String },
  Rating: { type: Number },
})(class User {});

module.exports = User;
