const booking = require('../../domain/models/booking');
const { Op } = require('sequelize');

module.exports = ({ database }) => {
  const add = async (booking, t) => {
    const totalStaff = await database.models.staff.findAll({
      where: {
        salonId: booking.salonId,
        role: 'stylist',
      },
    });

    const bookedStaff = await database.models.booking.findAll({
      order: [['endTime', 'ASC']],
      where: {
        salonId: booking.salonId,
        bookingDate: booking.bookingDate,
        [Op.or]: [
          {
            [Op.and]: [
              {
                startTime: {
                  [Op.lte]: booking.startTime,
                },
              },
              {
                endTime: {
                  [Op.gt]: booking.startTime,
                },
              },
            ],
          },
          {
            [Op.and]: [
              {
                startTime: {
                  [Op.gte]: booking.startTime,
                },
              },
              {
                startTime: {
                  [Op.lte]: booking.endTime,
                },
              },
            ],
          },
          {
            [Op.and]: [
              {
                startTime: {
                  [Op.lte]: booking.endTime,
                },
              },
              {
                endTime: {
                  [Op.gte]: booking.endTime,
                },
              },
            ],
          },
        ],
      },
    });

    if (totalStaff.length > bookedStaff.length) {
      const tStaff = [];
      const bStaff = [];
      totalStaff.forEach((staff) => tStaff.push(staff.dataValues.staffId));
      bookedStaff.forEach((staff) => bStaff.push(staff.dataValues.staffId));

      const availableStaff = tStaff.filter((x) => !bStaff.includes(x));
      booking.staffId = availableStaff[0];
      const data = toDatabase(booking);
      const new_booking = await database.models.booking.create(data, {
        transaction: t,
      });

      return toDomain(new_booking);
    } else {
      return `Next available slot starts from ${bookedStaff[0].dataValues.endTime}`;
    }
  };

  const getAll = async (booking, t) => {
    let new_booking = await database.models.booking.findAll({
      where: { salonId: booking.salonId },
      include: [
        {
          model: database.models.salon,
          attributes: ['name'],
          required: true,
        },
        {
          model: database.models.user,
          attributes: ['name'],
          required: true,
        },
        {
          model: database.models.staff,
          attributes: ['name'],
          required: true,
        },
      ],

      transaction: t,
    });

    new_booking.map(
      (booking) =>
        (booking.dataValues.salonName = booking.salon.dataValues.name)
    );
    new_booking.map(
      (booking) => (booking.dataValues.userName = booking.user.dataValues.name)
    );
    new_booking.map(
      (booking) =>
        (booking.dataValues.staffName = booking.staff.dataValues.name)
    );

    let bookings = new_booking.map((k) => toDomain(k));
    return bookings;
  };

  const toDomain = ({ dataValues }) => {
    return new booking({
      bookingId: dataValues.bookingId,
      bookingDate: dataValues.bookingDate,
      startTime: dataValues.startTime,
      endTime: dataValues.endTime,
      services: dataValues.services,
      totalCost: dataValues.totalCost,
      bookingStatus: dataValues.bookingStatus,
      paymentStatus: dataValues.paymentStatus,
      staffId: dataValues.staffId,
      userId: dataValues.userId,
      salonId: dataValues.salonId,
      staffName: dataValues.staffName,
      userName: dataValues.userName,
      salonName: dataValues.salonName,
    });
  };

  const toDatabase = (entity) => {
    return {
      bookingId: entity.bookingId,
      bookingDate: entity.bookingDate,
      startTime: entity.startTime,
      endTime: entity.endTime,
      services: entity.services,
      totalCost: entity.totalCost,
      bookingStatus: entity.bookingStatus,
      paymentStatus: entity.paymentStatus,
      staffId: entity.staffId,
      userId: entity.userId,
      salonId: entity.salonId,
    };
  };

  return {
    add,
    getAll,
  };
};

// SELECT `bookingId`, `bookingDate`, `startTime`, `endTime`, `services`, `totalCost`, `bookingStatus`, `paymentStatus`, `salonId`, `userId`, `staffId`
// FROM `booking` AS `booking`
// WHERE ((`booking`.`startTime` <= '00:09:30' AND `booking`.`endTime` <= '00:13:00')
// OR (`booking`.`startTime` >= '00:09:30' AND `booking`.`endTime` <= '00:13:00')
// OR (`booking`.`startTime` >= '00:09:30' AND `booking`.`endTime` >= '00:13:00')
// OR (`booking`.`startTime` >= '00:09:30' AND `booking`.`endTime` <= '00:13:00'))
// AND `booking`.`salonId` = 'SID-06281d49-9d85-4c2d-8378-43cb57ef969c';
