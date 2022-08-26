const SalonRepository = require('./salon');
const UserRepository = require('./user');

module.exports = ({ database, logger }) => {
  return {
    salonRepository: SalonRepository({ database }),
    userRepository: UserRepository({ database }),
  };
};
