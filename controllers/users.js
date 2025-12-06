const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res, next) => {
  //#swagger.tags = ['Users']
  try {
    const result = await mongodb.getDatabase().db().collection("Users").find();
    const users = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  //#swagger.tags = ['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Users")
      .find({ _id: userId });
    const users = await result.toArray();

    if (!users[0]) {
      return res.status(404).json({ message: "User not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  //#swagger.tags = ['Users']
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Users")
      .insertOne(user);
    if (response.acknowledged) {
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  //#swagger.tags = ['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Users")
      .replaceOne({ _id: userId }, user);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found or not modified" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  //#swagger.tags = ['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Users")
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
