const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contact-controllers");
const schemas = require("../../schemas/contacts");
const validate = require("../../decorators");
const { isValidId, authenticate } = require("../../middlewares");

router.use(authenticate);

router.get("/", contactController.getAllContacts);

router.get("/:contactId", isValidId, contactController.getContactById);

router.post(
  "/",
  validate.validateBodyOnPost(schemas.contactsSchema),
  contactController.createContact
);

router.delete("/:contactId", isValidId, contactController.deleteContactById);

router.put(
  "/:contactId",
  isValidId,
  validate.validateBodyOnPut(schemas.contactsSchema),
  contactController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validate.validateBodyOnPatch(schemas.contactUpdateFavoriteSchema),
  contactController.updateStatusContact
);

module.exports = router;
