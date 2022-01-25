const  mongoose  = require('mongoose')


const paymentRequestSchema = new mongoose.Schema({
    amount: { type: Number, required: true},
    createdBy: { type: String, ref:'User', required: true},
    purpose: { type: String, default:null },
    status: { type: String, enum: ['pending', 'paid'], default: 'pending'},
    createdAt: {type: Date, default: Date.now },
})

module.exports =  mongoose.model('PaymentRequest', paymentRequestSchema)