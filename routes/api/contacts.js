const express = require("express");
const router = express.Router();
const contactsService = require("../../models/contacts");
const contactsSchema = require("../../schemas/contacts");
const { HttpError } = require("../../helpers");

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (result === null) {
      //  throw HttpError(404, "Not found");
      return res.status(404).json({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
      // res.status(400).json({ message: "missing required name field" });
      // return;
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (result) {
      res.status(200).json({ message: "contact deleted" });
    }
    if (result === null) res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing fields" });
      return;
    }
    const result = await contactsService.updateContact(contactId, body);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
