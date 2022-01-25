const { PaymentRequest, Payment, User } = require("../models");
const mongoose = require("mongoose");

// creates new actual payment
exports.create = async (req, res) => {
  let { paymentRequestId } = req.body;
  let request = await PaymentRequest.findById(paymentRequestId);

  if (!request) {
    return res.status(404).end();
  }

  if (request.status !== "pending") {
    return res.status(400).send("payment request is not pending");
  }

  //  store payment
  let payment = new Payment({
    amount: request.amount,
    paymentRequestId,
    recipient: request.createdBy,
    createdBy: req.userId,
  });

  await payment.save();

  // update request status
  request.status = "paid";
  await request.save();

  // increment user balance
  await User.findByIdAndUpdate(request.createdBy, {
    $inc: { amountReceived: request.amount },
  });

  return res.status(200).end();
};

// list payments made to authenticated user
exports.list = async (req, res) => {
  let paymentList = await Payment.find({ recipient: req.userId }).populate(
    "createdBy"
  ).sort('-createdAt')
  let { amountReceived } = await User.findById(req.userId);

  let data = {
    totalAmountReceived: amountReceived,
    paymentList,
  };

  return res.json({ data });
};

// handles payment request
exports.request = async (req, res) => {
  let { amount, purpose } = req.body;
  if (!amount) {
    return res.status(400).end();
  }
  amount = Number(amount);
  const paymentRequest = await new PaymentRequest({
    amount,
    purpose,
    createdBy: req.userId,
  }).save();

  res.json({ data: paymentRequest });
};

exports.getPaymentRequest = async (req, res) => {
  let id = req.params.id;
  let paymentRequest = await PaymentRequest.findById(id);
  if (!paymentRequest) {
    return res.status(404).end();
  }
  return res.json({ data: paymentRequest });
};
