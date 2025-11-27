const express = require("express");
const router = express.Router();

const activitiesController = require("../controllers/activities");
const validateActivity = require("../validators/validateActivity");

// GET all activities
router.get("/", activitiesController.getAll);

// GET single activity
router.get("/:id", activitiesController.getSingle);

// POST new activity (with optional validation)
router.post("/", validateActivity, activitiesController.createActivity);

// PUT update activity (with optional validation)
router.put("/:id", validateActivity, activitiesController.updateActivity);

// DELETE activity
router.delete("/:id", activitiesController.deleteActivity);

module.exports = router;
