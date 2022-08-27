const booking = require('../../domain/models/booking');

module.exports = ({ database }) => {
  const add = async (booking, t) => {
    const data = toDatabase(booking);

    const new_booking = await database.models.booking.create(data, {
      transaction: t,
    });

    return toDomain(new_booking);
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
