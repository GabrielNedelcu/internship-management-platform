const mongoose = require("mongoose");

const journalEntry = new mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, "Start Date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End Date is required"],
  },
  description: {
    type: String,
    required: [true, "Entry Description is required"],
  },
});

const internshipsSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "The students is required"],
      unique: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "The company is required"],
    },
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "The offer is required"],
    },
    professor: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    journal: {
      type: [journalEntry],
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", internshipsSchema);
