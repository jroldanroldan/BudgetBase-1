const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now() },
  category: String,
  cost: Number,
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;