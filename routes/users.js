const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/users");
const validateContact = require("../validators/validateContact");

// GET all contacts
router.get("/", contactsController.getAll);

// GET single contact
router.get("/:id", contactsController.getSingle);

// POST new contact (with validation)
router.post("/", validateContact, contactsController.createContact);

// PUT update contact (with validation)
router.put("/:id", validateContact, contactsController.updateContact);

// DELETE contact
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
