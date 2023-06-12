const Contact = require("../models/contacts");
const { HttpError } = require("../helpers");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (result === null) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (result) {
      res.status(200).json({ message: "contact deleted" });
    }
    if (result === null) next();
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate(
      { _id: contactId },
      req.body,
      { new: true }
    );
    if (result) {
      res.status(200).json(result);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate(
      { _id: contactId },
      req.body,
      { new: true }
    );
    if (result) {
      res.status(200).json(result);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContactById,
  updateContactById,
  updateStatusContact,
};
