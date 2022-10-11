const { attributes } = require('structure');

// Salon staff data validation
const Staff = attributes({
  staffId: { type: String, required: true, exactLength: 40 },
  name: { type: String, required: true },
  role: { type: String, required: true },
  salonId: { type: String, required: true },
})(class Staff {});

module.exports = Staff;
