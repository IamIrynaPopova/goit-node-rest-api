const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contact-controllers");
const schemas = require("../../schemas/contacts");
const validate = require("../../decorators");

router.get("/", contactController.getAllContacts);

// router.get("/:contactId", contactController.getContactById);

// router.post(
//   "/",
//   validate.validateBodyOnPost(schemas.contactsSchema),
//   contactController.createContact
// );

// router.delete("/:contactId", contactController.deleteContactById);

// router.put(
//   "/:contactId",
//   validate.validateBodyOnPut(schemas.contactsSchema),
//   contactController.updateContactById
// );

module.exports = router;
