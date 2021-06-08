import {Request, Response} from 'express';
import { getUserAccounts, createUserAccount } from '../helpers/queries/accountQuery';
import account from '../models/account';
import mongoose from 'mongoose';
import { Schema, ObjectId } from 'mongoose';


export const getAccounts = async(req:Request, res:Response) => {
  const { id } = req.params;
  const userAccounts = await getUserAccounts(id);
  res.json(userAccounts);
}

export const createAccount = async(req:Request, res:Response) => {
  const { id, name } = req.body;
  const newAccount = await createUserAccount(id, name);
  res.json(newAccount);
}