const express = require("express");
const router = express.Router();

const reviewsController = require("../controllers/reviews");
const { isAuthenticated } = require("../middleware/authenticate");

// GET all reviews
router.get("/", reviewsController.getAllReviews);

// GET single review
router.get("/:id", reviewsController.getSingleReview);

// POST new review
router.post("/", isAuthenticated, reviewsController.createReview);

// PUT update review
router.put("/:id", isAuthenticated, reviewsController.updateReview);

// DELETE review
router.delete("/:id", isAuthenticated, reviewsController.deleteReview);

module.exports = router;
