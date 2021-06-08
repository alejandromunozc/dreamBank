import Transaction from '../../models/transaction';
import mongoose from 'mongoose';
import { config } from '../../config/config';



export const getAccountTransactions = async(accountId:string) => {
  return await Transaction.aggregate([
    {
      $match: { account: accountId }
    }
  ])
}

export const getAccountTransactionDetail = async(transactionId:string) => {
  const taxesTransaction = parseFloat(<any>config.taxes);
  return await Transaction.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(transactionId)
      }
    },
    {
      $lookup: {
        from: 'accounts',
        localField: 'account',
        foreignField: '_id',
        as: 'account'
      }
    },
    {
      $unwind: '$account'
    },
    {
      $project: {
        _id:1,
        commerce:1,
        amount:1,
        taxes: {$round: [{$subtract: ['$amount', {$divide: ['$amount', taxesTransaction]}]}, 2]},
        state:1,
        'account.accountName':1,
        createdAt:1
      }
    }
  ])
}

export const createAccountTransaction = async(accountId:mongoose.Schema.Types.ObjectId, commerce:string, amount:number, state:string) => {
  const newTransaction = new Transaction();
  newTransaction.commerce = commerce;
  newTransaction.amount = amount;
  newTransaction.state = state;
  newTransaction.account = accountId;
  return await newTransaction.save();
}

export const averageAccountTransaction = async(accountId:string, initialDate:Date, finalDate:Date) => {
  return await Transaction.aggregate([
    {
      $match: {
        account: new mongoose.Types.ObjectId(accountId),
        createdAt: {$gte: initialDate, $lte: finalDate}
      }
    }
  ])

}