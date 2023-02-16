const express = require("express");

const auth = require("../middleware/auth.middleware");

const authRouter = require("./auth/auth.router");
const offersRouter = require("./offers/offers.router");
const studentsRouter = require("./students/students.router");
const accountsRouter = require("./accounts/accounts.router");
const companiesRouter = require("./companies/companies.router");
const professorsRouter = require("./professors/professors.router");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/accounts", accountsRouter);
api.use("/offers", auth, offersRouter);
api.use("/companies", companiesRouter);
api.use("/students", auth, studentsRouter);
api.use("/professors", auth, professorsRouter);

module.exports = api;
