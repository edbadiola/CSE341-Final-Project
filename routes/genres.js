const express = require("express");
const router = express.Router();

const genresController = require("../controllers/Genres");
const { isAuthenticated } = require("../middleware/authenticate");

// GET all genres
router.get("/", genresController.getAllGenres);

// GET single genre
router.get("/:id", genresController.getSingleGenre);

// POST new genre
router.post("/", isAuthenticated, genresController.createGenre);

// PUT update genre
router.put("/:id", isAuthenticated, genresController.updateGenre);

// DELETE genre
router.delete("/:id", isAuthenticated, genresController.deleteGenre);

module.exports = router;
