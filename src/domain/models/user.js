const { attributes } = require('structure');

const User = attributes({
  UserId: { type: String, required: true },
  Name: { type: String },
  Email: { type: String },
  Phone: { type: String },
  Password: { type: String },
  City: { type: String },
  Gender: { type: String },
  Rating: { type: Number },
})(class User {});

module.exports = User;
