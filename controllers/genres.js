const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllGenres = async (req, res, next) => {
  //#swagger.tags = ['Genres']
  try {
    const result = await mongodb.getDatabase().db().collection("Genres").find();
    const genres = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
};

const getSingleGenre = async (req, res, next) => {
  //#swagger.tags = ['Genres']
  try {
    const genreId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Genres")
      .find({ _id: genreId });
    const genres = await result.toArray();

    if (!genres[0]) {
      return res.status(404).json({ message: "Genre not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(genres[0]);
  } catch (error) {
    next(error);
  }
};

const createGenre = async (req, res, next) => {
  //#swagger.tags = ['Genres']
  const genre = {
    name: req.body.name,
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Genres")
      .insertOne(genre);
    if (response.acknowledged) {
      res.status(201).json({ message: "Genre created successfully" });
    } else {
      res.status(500).json({ message: "Failed to create genre" });
    }
  } catch (error) {
    next(error);
  }
};

const updateGenre = async (req, res, next) => {
  //#swagger.tags = ['Genres']
  try {
    const genreId = new ObjectId(req.params.id);
    const genre = {
      name: req.body.name,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Genres")
      .replaceOne({ _id: genreId }, genre);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Genre not found or not modified" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteGenre = async (req, res, next) => {
  //#swagger.tags = ['Genres']
  try {
    const genreId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Genres")
      .deleteOne({ _id: genreId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Genre not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGenres,
  getSingleGenre,
  createGenre,
  updateGenre,
  deleteGenre,
};
