const express = require("express");
const ctrl = require("../controllers/contacts");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", ctrl.getOneContact);

contactsRouter.post("/", ctrl.createContact);

contactsRouter.delete("/:id", ctrl.deleteContact);

contactsRouter.put("/:id", ctrl.updateContact);

module.exports = contactsRouter;
