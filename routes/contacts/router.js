const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = require("../../controllers/contacts/");

const contactsRouter = express.Router();
