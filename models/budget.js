const mongoose = require('mongoose');


const budgetSchema = new mongoose.Schema({
    name: String, 
    amount: Number, 
    currentAmount: Number, 
    user: {type: mongoose.Schema.Types.ObjectId, ref : 'User'},
    archive: Boolean
});


const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;