const express = require("express");
const router = express.Router();

const activitiesController = require("../controllers/activities");
//const validateActivity = require("../validators/validateActivity");
const { isAuthenticated } = require("../middleware/authenticate")

// GET all activities
router.get("/", activitiesController.getAll);

// GET single activity
router.get("/:id", activitiesController.getSingle);

// POST new activity 
router.post(
  "/", isAuthenticated, activitiesController.createActivity);

// PUT update activity 
router.put("/:id", isAuthenticated, activitiesController.updateActivity);

// DELETE activity
router.delete("/:id", isAuthenticated, activitiesController.deleteActivity);

module.exports = router;
