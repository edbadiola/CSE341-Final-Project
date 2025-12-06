const { body } = require("express-validator");

const validateMovie = [
  body("title").notEmpty().withMessage("Movie title is required"),
  body("year").isNumeric().withMessage("Year must be a number"),
  body("director").notEmpty().withMessage("Director name required"),
  body("genre").isArray({ min: 1 }).withMessage("Genre must be an array"),
  body("key-words").isArray({ min: 1 }).withMessage("Keywords must be an array"),
];

const validateGenre = [
  body("name").notEmpty().withMessage("Genre name is required"),
];


const validateUser = [
  body("username").notEmpty().withMessage("Username required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const validateReview = [
  body("movieTitle").notEmpty().withMessage("Movie title required"),
  body("username").notEmpty().withMessage("Username required"),
  body("shortReview").notEmpty().withMessage("Review cannot be empty"),
  body("rating").isNumeric().withMessage("Rating must be a number"),
  body("wouldRecommend").isBoolean().withMessage("WouldRecommend must be true/false"),
  body("favorite").isBoolean().withMessage("Favorite must be true/false"),
];

module.exports = { validateMovie, validateGenre, validateUser, validateReview };
