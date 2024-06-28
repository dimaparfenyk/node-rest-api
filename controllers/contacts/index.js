const contacts = require("../../services/contactServices.js");
const {
  createContactSchema,
  updContactSchema,
} = require("../../schemas/contacts/schemas");
const { HttpError, ctrlWrapper, validateBody } = require("../../helpers");

const getAllContacts = async (req, res, next) => {
  const result = await contacts.getAllContacts();
  res.json(result);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.getOneContact(id);
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.deleteContact(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  // res.status(204).send();
  res.json({
    message: "Delete success",
  });
};

const createContact = async (req, res, next) => {
  validateBody(createContactSchema, req.body);

  const result = await contacts.createContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  validateBody(updContactSchema, req.body);

  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
