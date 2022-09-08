const review = require('../../domain/models/review');

module.exports = ({ database }) => {
  const add = async (review, t) => {
    const data = toDatabase(review);

    //Add new review to the review database
    const new_review = await database.models.review.create(data, {
      transaction: t,
    });

    return toDomain(new_review);
  };

  const getAll = async (review, t) => {
    //Get the salon with salon id
    const salon = await database.models.salon.findOne({
      attributes: ['name'],
      where: { salonId: review.salonId },
    });

    //Get all reviews for the salon
    let new_review = await database.models.review.findAll({
      where: { salonId: review.salonId },
      include: {
        model: database.models.user,
        attributes: ['name'],
        required: true,
      },

      transaction: t,
    });

    //Map the salon name to the reviews data
    new_review.map(
      (review) => (review.dataValues.salonName = salon.dataValues.name)
    );

    //Map the user name to the reviews data
    new_review.map(
      (review) => (review.dataValues.userName = review.user.dataValues.name)
    );

    //Map all the entries together
    let reviews = new_review.map((k) => toDomain(k));
    return reviews;
  };

  //Validate the data
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

  //Store the data
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
