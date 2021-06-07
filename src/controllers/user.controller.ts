import {Request, Response} from 'express';
import { newUserRegister, userLogin } from '../helpers/queries/userQuery';
import User, {IUser} from '../models/user'

export const login = async(req:Request, res:Response) => {
  if(!req.body.identification || !req.body.password){
    return res.json({Error: 'Must send identification and password'});
  }

  const loginUser = await userLogin(req.body);
  return res.json(loginUser);
}

export const register = async(req:Request, res:Response) => {
  if(!req.body.name || !req.body.identification || !req.body.password){
    return res.json({Error: 'incomplete data: name, identification and password are required'});
  }
  const newUser = await newUserRegister(req.body);
  return res.json(newUser);
}