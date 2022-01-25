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

  const session = await mongoose.startSession();
  session.withTransaction(async () => {
    //  store payment
    await new Payment(
      {
        amount: request.amount,
        paymentRequestId,
        recipient: request.user,
        createdBy: req.userId,
      },
      { session }
    ).save();

    // update request status to paid
    await request.update({
      status: "paid",
    });

    // increment user balance 
   await User.findByIdAndUpdate(request.createdBy, { $inc: { balance: request.amount}})
  });

  session.endSession();
  return res.status(200).send("success!");
};

// list payments made to authenticated user
exports.list = async (req, res) => {
  let recentPayments = await Payment.find({ recipient: req.userId });
  return res.json({ message: "recent payments", data: recentPayments });
};


// handles payment request
exports.request = async (req, res) => {
  let { amount, purpose } = req.body;
  if (!amount) {
    return res.status(400).end();
  }
  amount= Number(amount)
  const paymentRequest = await new PaymentRequest({
    amount,
    purpose,
    createdBy: req.userId,
  }).save();

  res.json({data: paymentRequest });
};

exports.getPaymentRequest = async (req, res) =>{
  let id =req.params.id;
  let paymentRequest =await PaymentRequest.findById(id)
  if(!paymentRequest){
    return res.status(404).end()
  }
  return res.json({ data: paymentRequest})
}

