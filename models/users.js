const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const usersSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: { type: String },
    avatarURL: {
      type: String,
      default: "",
    },
  },

  { versionKey: false, timestamps: true }
);

usersSchema.post("save", handleMongooseError);

const User = model("user", usersSchema);

module.exports = User;
