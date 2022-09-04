const booking = require('../../domain/models/booking');
const logic = require('./logic');
const { Op } = require('sequelize');

module.exports = ({ database }) => {
  const add = async (booking, t) => {
    const result = await logic({ database }, booking, t);

    if (typeof result == 'string') {
      return result;
    } else {
      let totalCost = 0;
      for (let i = 0; i < result.serviceIds.length; i++) {
        const svc = await database.models.service.findOne({
          where: { serviceId: result.serviceIds[i] },
        });
        totalCost += svc.dataValues.price;
      }
      if (result.totalAmount == totalCost) {
        result.bookingStatus = 'confirmed';
        const data = toDatabase(result);
        const new_booking = await database.models.booking.create(data, {
          transaction: t,
        });
        return toDomain(new_booking);
      } else {
        return 'total amount is mismatched';
      }
    }
  };

  const updateBooking = async (booking, t) => {
    const existingBooking = await database.models.booking.findOne({
      where: {
        bookingId: booking.bookingId,
      },
    });

    if (existingBooking) {
      const result = await logic({ database }, booking, t);
      if (typeof result == 'object') {
        const data = toDatabase(result);
        const new_booking = await database.models.booking.update(data, {
          where: {
            bookingId: result.bookingId,
          },
          transaction: t,
        });

        return toDatabase(new_booking);
      } else {
        return result;
      }
    } else {
      return 'No booking is available in records';
    }
  };

  const deleteBooking = async (booking, t) => {
    const new_booking = await database.models.booking.destroy({
      where: {
        bookingId: booking.bookingId,
      },
      transaction: t,
    });

    if (new_booking) {
      return {
        data: `Booking - ${booking.bookingId} is cancelled succesfully`,
      };
    } else {
      return 'No booking is available in records';
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

    new_booking.map((booking) => (booking.dataValues.svc = []));

    for (let i = 0; i < new_booking.length; i++) {
      const svcName = await database.models.service.findAll({
        where: {
          serviceId: {
            [Op.or]: new_booking[i].dataValues.serviceIds,
          },
        },
      });
      new_booking[i].dataValues.svc.push(
        svcName.map((s) => s.dataValues.subservice)
      );
    }

    let bookings = new_booking.map((k) => toDomain(k));
    return bookings;
  };

  const toDomain = ({ dataValues }) => {
    return new booking({
      bookingId: dataValues.bookingId,
      bookingDate: dataValues.bookingDate,
      startTime: dataValues.startTime,
      endTime: dataValues.endTime,
      serviceIds: dataValues.serviceIds,
      totalAmount: dataValues.totalAmount,
      bookingStatus: dataValues.bookingStatus,
      paymentStatus: dataValues.paymentStatus,
      staffId: dataValues.staffId,
      userId: dataValues.userId,
      salonId: dataValues.salonId,
      staffName: dataValues.staffName,
      userName: dataValues.userName,
      salonName: dataValues.salonName,
      serviceNames: dataValues.svc,
    });
  };

  const toDatabase = (entity) => {
    return {
      bookingId: entity.bookingId,
      bookingDate: entity.bookingDate,
      startTime: entity.startTime,
      endTime: entity.endTime,
      serviceIds: entity.serviceIds,
      totalAmount: entity.totalAmount,
      bookingStatus: entity.bookingStatus,
      paymentStatus: entity.paymentStatus,
      staffId: entity.staffId,
      userId: entity.userId,
      salonId: entity.salonId,
      totalAmount: entity.totalAmount,
    };
  };

  return {
    add,
    getAll,
    updateBooking,
    deleteBooking,
  };
};
