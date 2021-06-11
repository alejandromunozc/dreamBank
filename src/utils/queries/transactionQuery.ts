import mongoose from 'mongoose';
import Transaction from '../../models/transaction';
import { Status } from '../enums';
import { config } from '../../config/config';

export const getAccountTransactions = async(accountId:string) => {
  try {
    return await Transaction.aggregate([
      {
        $match: { account: accountId }
      }
    ]);
  } catch (error) {
    return {'error': error};
  }
}

export const getAccountTransactionDetail = async(transactionId:string) => {
  try {
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
    ]);
  } catch (error) {
    return {'error': error};
  }
}

export const createAccountTransaction = async(accountId:mongoose.Schema.Types.ObjectId, commerce:string, amount:number, state:number) => {
  try {
    const newTransaction = new Transaction();
    newTransaction.commerce = commerce;
    newTransaction.amount = amount;
    newTransaction.state = Status[state];
    newTransaction.account = accountId;
    return await newTransaction.save();
  } catch (error) {
    return {'error': error};
  }
}

export const averageAccountTransaction = async(accountId:string, initialDate:Date, finalDate:Date) => {
  try {
    return await Transaction.aggregate([
      {
        $match: {
          account: new mongoose.Types.ObjectId(accountId),
          createdAt: {$gte: initialDate, $lte: finalDate}
        }
      },
      {
        $group: {
          _id: accountId,
          averageAmount: {$avg: '$amount'}
        }
      }
    ]);
  } catch (error) {
    return {'error': error};
  }
}