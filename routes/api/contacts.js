const express = require("express");

const router = express.Router();

const contactsService = require("../../models/contacts");

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
      return res.status(404).json({ message: "Not found" });
    } else return res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.phone) {
      res.status(400).json({ message: "missing required name field" });
      return;
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
});

router.put("/:contactId", async (req, res, next) => {
  // try {
  //   const { contactId } = req.params;
  //   const body = req.body;

  //   if (!body) {
  //     res.status(400).json({ message: "missing fields" });
  //     return;
  //   }

  //   const result = await contactsService.updateContact(contactId, body);

  //   if (result) {
  //     res.status(200).json(result);
  //   } else {
  //     res.status(404).json({ message: "Not found" });
  //   }
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
});

module.exports = router;
