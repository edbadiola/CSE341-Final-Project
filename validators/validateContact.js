const { body, validationResult } = require("express-validator");

const validateContact = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("age")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Age must be a positive integer"),
  body("cityAddress")
    .optional()
    .isString()
    .withMessage("City address must be a string"),
  body("favoriteColor")
    .optional()
    .isString()
    .withMessage("Favorite color must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateContact;
