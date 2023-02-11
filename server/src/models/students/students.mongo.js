require("dotenv").config();

const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const addressSchema = new mongoose.Schema({
  county: {
    type: String,
    required: [true, "County name is required"],
  },
  town: {
    type: String,
    required: [true, "Town name is required"],
  },
  street: {
    type: String,
    required: [true, "Street name is required"],
  },
  number: {
    type: String,
    required: [true, "Street number is required"],
  },
  building: {
    type: String,
  },
  staircase: {
    type: String,
  },
  appartament: {
    type: String,
  },
});

const studentsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "account email is mandatory"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Student's name is required"],
    },
    group: {
      type: String,
      required: [true, "The student's group is required"],
    },
    major: {
      type: String,
      enum: {
        values: ["ELA", "RST", "TST", "MON", "ELA_EN", "TST_EN", "CTI", "UNK"],
        message: "{VALUE} is not supported",
      },
      default: null,
    },
    cv: {
      type: String,
      default: null,
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    cnp: {
      type: String,
      validate: {
        validator: function (value) {
          if (value && value.length !== 13) return false;
          return (!value && this.passport) || (value && !this.passport);
        },
        message: "invalid CNP",
      },
      default: null,
    },
    passport: {
      type: String,
      default: null,
    },
    legalAddress: {
      type: addressSchema,
      default: null,
    },
    address: {
      type: addressSchema,
      default: null,
    },
    birthPlace: {
      type: String,
      default: null,
    },
    birthDay: {
      type: Date,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    citizenship: {
      type: String,
      default: null,
    },
    stats: {
      applications: {
        type: Number,
        default: 0,
      },
      interviews: {
        type: Number,
        default: 0,
      },
      acceptances: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

studentsSchema.plugin(encrypt, {
  encryptionKey: process.env.MONGO_ENCRYPTION_KEY,
  signingKey: process.env.MONGO_SIGNING_KEY,
  encryptedFields: ["cnp", "passport"],
});

module.exports = mongoose.model("Student", studentsSchema);
