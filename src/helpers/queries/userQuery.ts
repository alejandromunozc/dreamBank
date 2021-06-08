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

  const {_id, name, identification} = userExists;

  if(isMatch){
    return {token: createToken(user), _id, name, identification }
  }

  return {Error: 'Identification or Password are incorrect'}
}

export const findUser = async(identification:number) => {
  return await User.findOne({identification});
}

export const updateUser = async(data:IUser) => {
  let user:IUser = await User.findById({_id: data.id}) || data;

  if(data.name){
    user.name = data.name;
  }

  await User.findByIdAndUpdate(data.id, {$set: user});

  return user;
}

export const addAccountToUser = async(userId:string, accountId:string) => {
  try {
    await User.findByIdAndUpdate(userId, {$push: {bankAccount: accountId}});
    return {msg: 'User account updated'};
  } catch (error) {
    return {'error': error};
  }
}