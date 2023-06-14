const Contact = require("../models/contacts");
const { HttpError } = require("../helpers");

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.find({ owner }).populate("owner", "email");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findOne({ _id: contactId, owner });
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
    const { _id: owner } = req.user;
    console.log(owner);
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findOneAndRemove({ _id: contactId, owner });
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
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate(
      { _id: contactId },
      req.body,
      { new: true },
      owner
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
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate(
      { _id: contactId },
      req.body,
      { new: true },
      owner
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
