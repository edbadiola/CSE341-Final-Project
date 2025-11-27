const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  //#swagger.tags = ['Contacts']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .find();
    const contacts = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (error) {
    next(error); 
  }
};

const getSingle = async (req, res, next) => {
  //#swagger.tags = ['Contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .find({ _id: contactId });
    const contacts = await result.toArray();

    if (!contacts[0]) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts[0]);
  } catch (err) {
    next(err);
  }
};

const createContact = async (req, res, next) => {
  //#swagger.tags = ['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    cityAddress: req.body.cityAddress,
    favoriteColor: req.body.favoriteColor,
    email: req.body.email,
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json({ message: "Contact created successfully" });
    } else {
      res.status(500).json({ message: "Failed to create contact" });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  //#swagger.tags = ['Contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      cityAddress: req.body.cityAddress,
      favoriteColor: req.body.favoriteColor,
      email: req.body.email,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Contact not found or not modified" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  //#swagger.tags = ['Contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("contacts")
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
