const express = require("express");
const ctrl = require("../controllers/contacts");

const { validateBody } = require("../helpers");
const schemas = require("../schemas/contacts/schemas.js");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", ctrl.getOneContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  ctrl.createContact
);

contactsRouter.delete("/:id", ctrl.deleteContact);

contactsRouter.put(
  "/:id",
  validateBody(schemas.updContactSchema),
  ctrl.updateContact
);

module.exports = contactsRouter;
