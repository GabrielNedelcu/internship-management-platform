const express = require("express");
const helmet = require("helmet");

const api = require("./routes/api");
const errorHandler = require("./middleware/errors.middleware");

const app = express();

app.use(helmet());
app.use(express.json());

app.use("/v1", api);

app.use(errorHandler);

module.exports = app;
