const  mongoose  = require('mongoose')

const schema = new mongoose.Schema({
    amount: { type: Number, required: true},
    createdBy: { type: String, ref:'User', required: true},
    recipient: { type: String,ref:'User', required: true },
    paymentRequestId: {type: String, ref: 'PaymentRequest'},
    createdAt: {type: Date, default: Date.now },
})

module.exports = mongoose.model('Payment', schema)