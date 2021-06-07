import User, {IUser} from '../../models/user';
import { createToken } from '../jwt';


export const newUserRegister = async(user:IUser):Promise<{}> => {
  const userExists = await User.findOne({identification: user.identification});
  if(userExists){
    return {msg: 'User already exists'}
  }

  const newUser = new User(user);
  newUser.password = await newUser.encryptPass(user.password);
  await newUser.save();
  return newUser;
}

export const userLogin = async(user:IUser):Promise<{}> => {
  const userExists = await User.findOne({identification: user.identification});
  if(!userExists){
    return {msg: 'User not exists'};
  }

  const passMatch = new User(userExists)
  const isMatch = await passMatch.matchPass(user.password);

  if(isMatch){
    return {token: createToken(user)}
  }

  return {Error: 'Identification or Password are incorrect'}
}

export const findUser = async(identification:number) => {
  return await User.findOne({identification});
}