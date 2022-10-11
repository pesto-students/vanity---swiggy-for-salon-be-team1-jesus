const { Op } = require('sequelize');

const logic = async ({ database }, booking, t) => {
  //Get the total number of hair-stylist staff for the salon
  const totalStaff = await database.models.staff.findAll({
    where: {
      salonId: booking.salonId,
      role: 'stylist',
    },
  });

  /**
   * Get the new booking data like booking date, id, time slot etc
   * Get all the booked staff who are busy in the slot in which a new customer wanted to book an appointment
   *
   */
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

  //If any staff is free in the new booking time slot then assign the staff to new booking.
  if (totalStaff.length > bookedStaff.length) {
    const tStaff = [];
    const bStaff = [];
    totalStaff.forEach((staff) => tStaff.push(staff.dataValues.staffId));
    bookedStaff.forEach((staff) => bStaff.push(staff.dataValues.staffId));

    const availableStaff = tStaff.filter((staff) => !bStaff.includes(staff));
    booking.staffId = availableStaff[0];
  } else {
    return `Next available slot starts from ${bookedStaff[0].dataValues.endTime}`;
  }

  return booking;
};

module.exports = logic;
