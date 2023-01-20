const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const api = require("./routes/api");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use("/v1", api);

app.use(errorHandler);

module.exports = app;
