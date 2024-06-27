const contacts = require("../../services/contactServices.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../../schemas/contacts/schemas");
const { HttpError } = require("../../helpers");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contacts.getAllContacts();
    res.json(result);
  } catch (error) {
    // res.status(500).json({ message: "Server error"});
    next();
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getOneContact(id);
    res.json(result);
  } catch (error) {
    // res.status(404).json({message: "Not found"});
    next();
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.deleteContact(id);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    // res.status(204).send();
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next();
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.createContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next();
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    res.json(result);
  } catch (error) {
    next();
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
