const review = require('../../domain/models/review');

module.exports = ({ database }) => {
  const add = async (review, t) => {
    const data = toDatabase(review);

    const new_review = await database.models.review.create(data, {
      transaction: t,
    });

    return toDomain(new_review);
  };

  const getAll = async (review, t) => {
    const salon = await database.models.salon.findOne({
      attributes: ['name'],
      where: { salonId: review.salonId },
    });

    let new_review = await database.models.review.findAll({
      where: { salonId: review.salonId },
      include: {
        model: database.models.user,
        attributes: ['name'],
        required: true,
      },

      transaction: t,
    });

    new_review.map(
      (review) => (review.dataValues.salonName = salon.dataValues.name)
    );
    new_review.map(
      (review) => (review.dataValues.userName = review.user.dataValues.name)
    );

    let reviews = new_review.map((k) => toDomain(k));
    return reviews;
  };

  const toDomain = ({ dataValues }) => {
    return new review({
      reviewId: dataValues.reviewId,
      review: dataValues.review,
      rating: dataValues.rating,
      userId: dataValues.userId,
      salonId: dataValues.salonId,
      userName: dataValues.userName,
      salonName: dataValues.salonName,
    });
  };

  const toDatabase = (entity) => {
    return {
      reviewId: entity.reviewId,
      review: entity.review,
      rating: entity.rating,
      userId: entity.userId,
      salonId: entity.salonId,
    };
  };

  return {
    add,
    getAll,
  };
};
