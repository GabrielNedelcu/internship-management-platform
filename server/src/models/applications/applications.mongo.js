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
    acceptedForInterview: {
      type: Boolean,
      default: false,
    },
    acceptedByStudent: {
      type: Boolean,
      default: false,
    },
    declinedByStudent: {
      type: Boolean,
      default: false,
    },
    acceptedByCompany: {
      type: Boolean,
      default: false,
    },
    declinedByCompany: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationsSchema);
