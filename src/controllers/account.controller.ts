import {Request, Response} from 'express';
import { getUserAccounts, createUserAccount } from '../helpers/queries/accountQuery';

export const getAccounts = async(req:Request, res:Response) => {
  const { id } = req.params;
  const userAccounts = await getUserAccounts(id);
  res.json(userAccounts);
}

export const createAccount = async(req:Request, res:Response) => {
  const { id, name, typeAccount } = req.body;
  const newAccount = await createUserAccount(id, name, typeAccount);
  res.json(newAccount);
}