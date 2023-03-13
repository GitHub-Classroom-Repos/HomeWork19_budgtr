const mongoose = require('mongoose')

const moneySchema = new mongoose.Schema({
    date: { type: String },
    name: { type: String  },
    from: { type: String },
    amount: { type: Number},
})

const MoneySeed = mongoose.model('Money', moneySchema)

module.exports = MoneySeed