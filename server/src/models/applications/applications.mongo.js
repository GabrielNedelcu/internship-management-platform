const mongoose = require("mongoose");

const applicationsSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "The students is required"],
    },
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "The offer is required"],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "The company is required"],
    },
    offerTitle: {
      type: String,
      required: [true, "Offer title is required"],
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
    },
    studentName: {
      type: String,
      required: [true, "Student name is required"],
    },
    studentEmail: {
      type: String,
      required: [true, "Student email is required"],
    },
    studentMajor: {
      type: String,
      required: [true, "Student major is required"],
    },
    status: {
      type: String,
      enum: {
        values: [
          "inReview",
          "interviewAccepted",
          "companyAccepted",
          "companyDeclined",
          "studentAccepted",
          "studentDeclined",
          "professorAssgined",
        ],
        message: "{VALUE} is not supported",
      },
      default: "inReview",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationsSchema);
