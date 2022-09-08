const { attributes } = require('structure');

// User data validation
const User = attributes({
  userId: { type: String, required: true, exactLength: 40 },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String },
  gender: { type: String },
  rating: { type: Number },
})(class User {});

module.exports = User;
