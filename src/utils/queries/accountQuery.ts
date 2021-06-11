import Account from '../../models/account';
import { ProductType, Status } from '../enums';

export const getUserAccounts = async(userId:string) => {
  try {
    return await Account.aggregate([
      {
        $match: { user: userId }
      }
    ]);
  } catch (error) {
    return {'error': error};
  }
}

export const createUserAccount = async(userId:string, name:string, typeAccount:number) => {
  try {
    const newAccount = new Account();
    newAccount.accountName = name;
    newAccount.typeAccount = ProductType[typeAccount];
    newAccount.user = userId;
    newAccount.state = Status[1];
    return await newAccount.save();
  } catch (error) {
    return {'error': error};
  }
}