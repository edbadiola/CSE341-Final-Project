const express = require("express");
const router = express.Router();

const reviewsController = require("../controllers/reviews");
const { isAuthenticated } = require("../middleware/authenticate");
const { validationResult } = require("express-validator");
const { validateReview } = require("../validators/index"); 

// GET all reviews
router.get("/", reviewsController.getAllReviews);

// GET single review
router.get("/:id", reviewsController.getSingleReview);

// POST new review with validation
router.post("/", isAuthenticated, validateReview, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  reviewsController.createReview(req, res);
});

// PUT update review with validation
router.put("/:id", isAuthenticated, validateReview, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  reviewsController.updateReview(req, res);
});

// DELETE review
router.delete("/:id", isAuthenticated, reviewsController.deleteReview);

module.exports = router;
