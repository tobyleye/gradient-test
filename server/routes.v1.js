const express = require("express");
const { useAuth } = require("./middlewares");
const account = require("./controllers/account");
const payment = require("./controllers/payment");


const v1 = express.Router();

v1.post("/signup", account.register);
v1.post("/login", account.login);
v1.post("/payment-requests", useAuth, payment.request);
v1.get("/payment-requests/:id", useAuth, payment.getPaymentRequest);

v1.post("/payments", useAuth, payment.create);
v1.get("/payments", useAuth, payment.list);

module.exports = v1;
