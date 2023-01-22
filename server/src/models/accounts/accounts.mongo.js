const mongoose = require("mongoose");

const accountsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "account email is mandatory"],
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: {
        values: ["student", "company", "admin", "teacher"],
        message: "{VALUE} is not supported",
      },
      required: [true, "The account's role must be specified"],
    },
    passwordChanged: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    language: {
      type: String,
      enum: {
        values: ["ro", "en"],
        message: "{VALUE} is not supported",
      },
      default: "en",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountsSchema);
