import jwt from 'jsonwebtoken';
import {IUser} from '../models/user'
import {config} from '../config/config'

export const createToken = (user:IUser):string => {
  return jwt.sign({id: user.id, identification: user.identification}, config.secret || '');
}
