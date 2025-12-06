const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllMovies = async (req, res, next) => {
  //#swagger.tags = ['Movies']
  try {
    const result = await mongodb.getDatabase().db().collection("Movies").find();
    const movies = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

const getSingleMovie = async (req, res, next) => {
  //#swagger.tags = ['Movies']
  try {
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Movies")
      .find({ _id: movieId });
    const movies = await result.toArray();

    if (!movies[0]) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(movies[0]);
  } catch (error) {
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  //#swagger.tags = ['Movies']
  const movie = {
    title: req.body.title,
    year: req.body.year,
    director: req.body.director,
    genre: req.body.genre,
    "key-words": req.body["key-words"],
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Movies")
      .insertOne(movie);
    if (response.acknowledged) {
      res.status(201).json({ message: "Movie created successfully" });
    } else {
      res.status(500).json({ message: "Failed to create movie" });
    }
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  //#swagger.tags = ['Movies']
  try {
    const movieId = new ObjectId(req.params.id);
    const movie = {
      title: req.body.title,
      year: req.body.year,
      director: req.body.director,
      genre: req.body.genre,
      "key-words": req.body["key-words"],
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Movies")
      .replaceOne({ _id: movieId }, movie);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Movie not found or not modified" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  //#swagger.tags = ['Movies']
  try {
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Movies")
      .deleteOne({ _id: movieId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMovies,
  getSingleMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
