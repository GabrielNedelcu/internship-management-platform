const express = require("express");

const auth = require("../middleware/auth.middleware");

const authRouter = require("./auth/auth.router");
const studentsRouter = require("./students/students.router");
const accountsRouter = require("./accounts/accounts.router");
const companiesRouter = require("./companies/companies.router");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/accounts", accountsRouter);
api.use("/companies", companiesRouter);
api.use("/students", auth, studentsRouter);

module.exports = api;
