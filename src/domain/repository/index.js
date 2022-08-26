const SalonRepository = require('./salon');
const UserRepository = require('./user');
const ServiceRepository = require('./service');
const ReviewRepository = require('./review');
const StaffRepository = require('./staff');

module.exports = ({ database, logger }) => {
  return {
    salonRepository: SalonRepository({ database }),
    serviceRepository: ServiceRepository({ database }),
    userRepository: UserRepository({ database }),
    staffRepository: StaffRepository({ database }),
    reviewRepository: ReviewRepository({ database }),
  };
};
