const express = require("express");
const router = express.Router();
const contactController=require("../../controllers/contact-controllers");

router.get("/", contactController.getAllContacts);

router.get("/:contactId", contactController.getContactById);

router.post("/", contactController.createContact);

router.delete("/:contactId", contactController.deleteContactById);

router.put("/:contactId", contactController.updateContactById);

module.exports = router;
