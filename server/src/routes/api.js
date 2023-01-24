const express = require("express");

const authRouter = require("./auth/auth.router");
const accountsRouter = require("./accounts/accounts.router");
const companiesRouter = require("./companies/companies.router");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/accounts", accountsRouter);
api.use("/companies", companiesRouter);

module.exports = api;
