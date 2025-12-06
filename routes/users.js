const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const { isAuthenticated } = require("../middleware/authenticate");
const { validationResult } = require("express-validator");
const { validateUser } = require("../validators/index"); 

// GET all users
router.get("/", usersController.getAllUsers);

// GET single user
router.get("/:id", usersController.getSingleUser);

// POST new user with validation
router.post("/", isAuthenticated, validateUser, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  usersController.createUser(req, res);
});

// PUT update user with validation
router.put("/:id", isAuthenticated, validateUser, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  usersController.updateUser(req, res);
});

// DELETE user
router.delete("/:id", isAuthenticated, usersController.deleteUser);

module.exports = router;
