const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");
const isValidId = async (req, res, next) => {
        const { contactId } = req.params;
        if (!isValidObjectId(contactId)) {
          next(HttpError(404, `${contactId} is not a valid`));
        }
        next();
}

module.exports = isValidId;