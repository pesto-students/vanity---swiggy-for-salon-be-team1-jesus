const UserRepository = require('./user');
const SalonRepository = require('./salon');

module.exports = ({ database, logger }) => {
  return {
    userRepository: UserRepository({ database }),
  };
};

module.exports = ({ database, logger }) => {
  return {
    salonRepository: SalonRepository({ database }),
  };
};
