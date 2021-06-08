import Account, { ProductType } from '../../models/account';

export const getUserAccounts = async(userId:string) => {
  return await Account.aggregate([
    {
      $match: { user: userId }
    }
  ]);
}

export const createUserAccount = async(userId:string, name:string, typeAccount:number) => {
  const newAccount = new Account();
  newAccount.accountName = name;
  newAccount.typeAccount = ProductType[typeAccount];
  newAccount.user = userId;
  return await newAccount.save();
}