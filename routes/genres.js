const express = require("express");
const router = express.Router();

const genresController = require("../controllers/genres");
const { isAuthenticated } = require("../middleware/authenticate");
const { validationResult } = require("express-validator");
const { validateGenre } = require("../validators/index");

// GET all genres
router.get("/", genresController.getAllGenres);

// GET single genre
router.get("/:id", genresController.getSingleGenre);

// POST new genre with validation
router.post("/", isAuthenticated, validateGenre, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  genresController.createGenre(req, res);
});

// PUT update genre with validation
router.put("/:id", isAuthenticated, validateGenre, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  genresController.updateGenre(req, res);
});

// DELETE genre
router.delete("/:id", isAuthenticated, genresController.deleteGenre);

module.exports = router;
