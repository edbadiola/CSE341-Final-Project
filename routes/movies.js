const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/movies");
const { isAuthenticated } = require("../middleware/authenticate");

// GET all movies
router.get("/", moviesController.getAllMovies);

// GET single movie
router.get("/:id", moviesController.getSingleMovie);

// POST new movie
router.post("/", isAuthenticated, moviesController.createMovie);

// PUT update movie
router.put("/:id", isAuthenticated, moviesController.updateMovie);

// DELETE movie
router.delete("/:id", isAuthenticated, moviesController.deleteMovie);

module.exports = router;
