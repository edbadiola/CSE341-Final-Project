const { body, validationResult } = require("express-validator");

const validateActivity = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be in YYYY-MM-DD format"),
  body("time")
    .optional()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Time must be in HH:mm format"),
  body("participants")
    .optional()
    .isArray()
    .withMessage("Participants must be an array of strings"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateActivity;
