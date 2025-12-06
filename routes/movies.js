const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/movies");
const { isAuthenticated } = require("../middleware/authenticate");
const { validationResult } = require("express-validator");
const { validateMovie } = require("../validators/index"); 

// GET all movies
router.get("/", moviesController.getAllMovies);

// GET single movie
router.get("/:id", moviesController.getSingleMovie);

// POST new movie
router.post("/", isAuthenticated, validateMovie, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  moviesController.createMovie(req, res);
});

// PUT update movie
router.put("/:id", isAuthenticated, validateMovie, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  moviesController.updateMovie(req, res);
});

// DELETE movie
router.delete("/:id", isAuthenticated, moviesController.deleteMovie);

module.exports = router;
