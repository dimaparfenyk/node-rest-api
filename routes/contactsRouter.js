const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = require("../controllers/contacts");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.post("/", createContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.put("/:id", updateContact);

module.exports = contactsRouter;
