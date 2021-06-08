import mongoose from 'mongoose';

import Account, {IAccount} from '../../models/account';
import User, {IUser} from '../../models/user';
import { addAccountToUser } from './userQuery';

export const getUserAccounts = async(userId:string) => {
  const accounts = await Account.aggregate([
    {
      $match: { user: userId }
    }
  ])
  // const user = await User.aggregate([
  //   {
  //     $match: { _id: new mongoose.Types.ObjectId(userId) }
  //   },
  //   {
  //     $lookup: {
  //       from: 'accounts',
  //       localField: '_id',
  //       foreignField: 'user',
  //       as: 'account'
  //     }
  //   },
  //   {
  //     $unwind: '$account'
  //   },
  //   {
  //     $project: {
  //       _id:0,
  //       name:1,
  //       identification:1,
  //       'account._id':1,
  //       'account.accountName':1
  //     }
  //   }
  // ])
  return accounts;
}

export const createUserAccount = async(userId:string, name:string) => {
  const newAccount = new Account();
  newAccount.accountName = name;
  newAccount.user = userId;
  return await newAccount.save();
}