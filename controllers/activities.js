const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Get all activities
const getAll = async (req, res, next) => {
  //#swagger.tags = ['Activities']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("activities")
      .find();
    const activities = await result.toArray();
    res.status(200).json(activities);
  } catch (error) {
    next(error);
  }
};

// Get single activity by ID
const getSingle = async (req, res, next) => {
  //#swagger.tags = ['Activities']
  try {
    const activityId = new ObjectId(req.params.id);
    const activity = await mongodb
      .getDatabase()
      .db()
      .collection("activities")
      .findOne({ _id: activityId });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json(activity);
  } catch (err) {
    next(err);
  }
};

// Create a new activity
const createActivity = async (req, res, next) => {
  //#swagger.tags = ['Activities']
  const activity = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    participants: req.body.participants || [],
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("activities")
      .insertOne(activity);

    if (response.acknowledged) {
      res.status(201).json({ message: "Activity created successfully" });
    } else {
      res.status(500).json({ message: "Failed to create activity" });
    }
  } catch (error) {
    next(error);
  }
};

// Update an existing activity
const updateActivity = async (req, res, next) => {
  //#swagger.tags = ['Activities']
  try {
    const activityId = new ObjectId(req.params.id);
    const activity = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      participants: req.body.participants || [],
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("activities")
      .replaceOne({ _id: activityId }, activity);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Activity not found or not modified" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete an activity
const deleteActivity = async (req, res, next) => {
  //#swagger.tags = ['Activities']
  try {
    const activityId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("activities")
      .deleteOne({ _id: activityId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Activity not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getSingle,
  createActivity,
  updateActivity,
  deleteActivity,
};
