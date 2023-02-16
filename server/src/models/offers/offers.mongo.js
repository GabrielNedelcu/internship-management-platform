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

const offersSchema = new mongoose.Schema(
  {
    companyID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "The offer has to pe mapped to a company"],
    },
    companyName: {
      type: String,
      required: [true, "The Company title is required"],
    },
    title: {
      type: String,
      required: [true, "Job title is required"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    departament: {
      type: String,
      required: [true, "The departament is required"],
    },
    requirements: {
      type: String,
      default: null,
    },
    mentions: {
      type: String,
      default: null,
    },
    supervisor: {
      type: employeeSchema,
      required: [true, "Supervisor's data is required!"],
    },
    availablePos: {
      type: Number,
      required: [true, "The number of available positions is required"],
    },
    remainingAvailablePos: {
      type: Number,
      default: 0,
    },
    applications: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

offersSchema.pre("save", function (next) {
  this.remainingAvailablePos = this.get("availablePos");
  next();
});

module.exports = mongoose.model("Offer", offersSchema);
