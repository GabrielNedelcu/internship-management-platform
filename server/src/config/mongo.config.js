require("dotenv").config();

const mongoose = require("mongoose");

const logger = require("./logger.config");

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  logger.info("MongoDB connection established ...");
});

mongoose.connection.on("error", (err) => {
  const error = logger.child(err);
  error.error("Unexpected error while connecting to mongo!");
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
