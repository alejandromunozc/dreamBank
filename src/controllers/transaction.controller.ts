import {Request, Response} from 'express';
import Transaction from '../models/transaction';
import { averageAccountTransaction, createAccountTransaction, getAccountTransactionDetail, getAccountTransactions } from '../helpers/queries/transactionQuery';

export const getTransactions = async(req:Request, res:Response) => {
  const { id } = req.params;
  const accountTransactions = await getAccountTransactions(id);
  res.json(accountTransactions);
}

export const getTransactionDetail = async(req:Request, res:Response) => {
  const { id } = req.params;
  const accountTransactionDetail = await getAccountTransactionDetail(id);
  res.json(accountTransactionDetail);
}

export const createTransaction = async(req:Request, res:Response) => {
  const { id, commerce, amount, state } = req.body;
  const newTransaction = await createAccountTransaction(id, commerce, amount, state);
  res.json(newTransaction);
}

export const averageTransaction = async(req:Request, res:Response) => {
  const { id, initialDate, finalDate } = req.body;
  const average = await averageAccountTransaction(id, new Date(initialDate), new Date(finalDate));
  res.json(average);
}



