const express = require("express");
const ctrl = require("../controllers/contacts");

const { validateBody, isValidId } = require("../middleware");
const { schemas } = require("../models/contact");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValidId, ctrl.getOneContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  ctrl.createContact
);

contactsRouter.delete("/:id", isValidId, ctrl.deleteContact);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(schemas.createContactSchema),
  ctrl.updateContactById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updContactSchema),
  ctrl.updateFavorite
);

module.exports = contactsRouter;
