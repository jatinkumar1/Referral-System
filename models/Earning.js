const mongoose = require('mongoose');

const EarningSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sourceUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  level: Number,
  amount: Number,
  purchaseAmount: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Earning', EarningSchema);

