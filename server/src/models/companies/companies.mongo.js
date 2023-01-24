const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Employee name is required"],
  },
  jobTitle: {
    type: String,
    required: [true, "Employee title is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Employee phone is required"],
  },
  email: {
    type: String,
    required: [true, "Employee email is required"],
  },
});

const companiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Company name is required"],
    },
    address: {
      type: String,
      required: [true, "Company address is required"],
    },
    contactNumber: {
      type: String,
      required: [true, "Company phone is required"],
    },
    description: {
      type: String,
      required: [true, "Company desciption is required"],
    },
    fieldOfWork: {
      type: String,
      enum: {
        values: ["telecom", "softwareDev", "electronics", "other"],
        message: "{VALUE} is not supported",
      },
      required: [true, "Company field of work is required"],
    },
    legalRep: {
      type: employeeSchema,
      required: [true, "Company's legal representative is required!"],
    },
    handler: {
      type: employeeSchema,
      required: [true, "Company's internship manager is required"],
    },
    internshipMainAddress: {
      type: String,
      required: [true, "Company's workplace address is required"],
    },
    internshipOtherAddresses: {
      type: String,
      required: false,
      default: null,
    },
    internshipOtherAdvantages: {
      type: String,
      required: false,
      default: null,
    },
    internshipCompensation: {
      type: Boolean,
      required: true,
      default: false,
    },
    internshipContract: {
      type: Boolean,
      required: true,
      default: false,
    },
    validated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companiesSchema);
