const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllReviews = async (req, res, next) => {
  //#swagger.tags = ['Reviews']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Reviews")
      .find();
    const reviews = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

const getSingleReview = async (req, res, next) => {
  //#swagger.tags = ['Reviews']
  try {
    const reviewId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Reviews")
      .find({ _id: reviewId });
    const reviews = await result.toArray();

    if (!reviews[0]) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(reviews[0]);
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  //#swagger.tags = ['Reviews']
  const review = {
    movieTitle: req.body.movieTitle,
    username: req.body.username,
    shortReview: req.body.shortReview,
    rating: req.body.rating,
    wouldRecommend: req.body.wouldRecommend,
    favorite: req.body.favorite,
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Reviews")
      .insertOne(review);
    if (response.acknowledged) {
      res.status(201).json({ message: "Review created successfully" });
    } else {
      res.status(500).json({ message: "Failed to create review" });
    }
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  //#swagger.tags = ['Reviews']
  try {
    const reviewId = new ObjectId(req.params.id);
    const review = {
      movieTitle: req.body.movieTitle,
      username: req.body.username,
      shortReview: req.body.shortReview,
      rating: req.body.rating,
      wouldRecommend: req.body.wouldRecommend,
      favorite: req.body.favorite,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Reviews")
      .replaceOne({ _id: reviewId }, review);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Review not found or not modified" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  //#swagger.tags = ['Reviews']
  try {
    const reviewId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Reviews")
      .deleteOne({ _id: reviewId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
};
