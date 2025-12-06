const express = require("express");
const router = express.Router();

const usersController = require("../controllers/Users");
const { isAuthenticated } = require("../middleware/authenticate");

// GET all users
router.get("/", usersController.getAllUsers);

// GET single user
router.get("/:id", usersController.getSingleUser);

// POST new user
router.post("/", isAuthenticated, usersController.createUser);

// PUT update user
router.put("/:id", isAuthenticated, usersController.updateUser);

// DELETE user
router.delete("/:id", isAuthenticated, usersController.deleteUser);

module.exports = router;
