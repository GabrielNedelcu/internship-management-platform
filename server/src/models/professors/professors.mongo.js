const mongoose = require("mongoose");

const professorsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "account email is mandatory"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Professor's name is required"],
    },
    title: {
      type: String,
      required: [true, "Professor's title is required"],
    },
    privatePhone: {
      type: String,
      required: [true, "Professor's private phone number is required"],
    },
    publicPhone: {
      type: String,
      required: [true, "Professor's public phone number is required"],
    },
    departament: {
      type: String,
      required: [true, "Professor's departament is required"],
    },
    numPositions: {
      type: Number,
      default: 1,
    },
    numAvailablePositions: {
      type: Number,
      default: 1,
    },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Professor", professorsSchema);
