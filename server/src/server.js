require("dotenv").config();

const http = require("http");

const app = require("./app");
const logger = require("./config/logger.config");
const { mongoConnect } = require("./config/mongo.config");

const PORT = process.env.PORT || 8000;
const SERVER = http.createServer(app);

const startServer = async () => {
  await mongoConnect();

  SERVER.listen(PORT, () => {
    logger.info(`Server started on port ${PORT} ...`);
  });
};

startServer();
