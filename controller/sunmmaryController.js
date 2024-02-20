const Transaction = require("../models/transaction")

exports.allTransactions = async (req, res, next) => {
    const count = await Transaction.find({}).count()
        console.log( "Number of transactions:", count );
        res.status(200).json({
            success: true,
            count: count
          });
    
}
exports.successTransactions = async (req, res, next) => {
    const count = await Transaction.find({status : "success"}).count()
        console.log( "Number of success transactions:", count );
        res.status(200).json({
            success: true,
            count: count
          });
    
}
exports.failedTransactions = async (req, res, next) => {
    const count = await Transaction.find({status : "failed"}).count()
        console.log( "Number of failed transactions:", count );
        res.status(200).json({
            success: true,
            count: count
          });
    
}
exports.unknownTransactions = async (req, res, next) => {
    const count = await Transaction.find({status : "unknown"}).count()
        console.log( "Number of unknown transactions:", count );
        res.status(200).json({
            success: true,
            count: count
          });
    
}