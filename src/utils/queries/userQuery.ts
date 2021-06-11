import User, {IUser} from '../../models/user';
import { createToken } from '../jwt';

export const newUserRegister = async(user:IUser):Promise<{}> => {
  const userExists = await User.findOne({identification: user.identification});
  if(userExists){
    return {msg: 'User already exists'}
  }

  try {
    const newUser = new User(user);
    newUser.password = await newUser.encryptPass(user.password);
    await newUser.save();
    return newUser;
  } catch (error) {
    return {'error': error};
  }

}

export const userLogin = async(user:IUser):Promise<{}> => {

  try {
    const userExists = await User.findOne({identification: user.identification});
    if(!userExists){
      return {msg: 'User not exists'};
    }
    const passMatch = new User(userExists)
    const isMatch = await passMatch.matchPass(user.password);

    const {_id, name, identification} = userExists;

    if(!isMatch){
      return {Error: 'Identification or Password are incorrect'}
    }
    return {token: createToken(user), _id, name, identification }

  } catch (error) {
    return {'error': error};
  }

}

export const findUser = async(identification:number) => {
  try {
    return await User.findOne({identification});
  } catch (error) {
    return {'error': error};
  }
}

export const updateUser = async(data:IUser) => {
  try {
    const user:IUser = await User.findById({_id: data.id}) || data;
    if(data.name){
      user.name = data.name;
    }
    await User.findByIdAndUpdate(data.id, {$set: user});
    return user;
  } catch (error) {
    return {'error': error};
  }
}

export const addAccountToUser = async(userId:string, accountId:string) => {
  try {
    await User.findByIdAndUpdate(userId, {$push: {bankAccount: accountId}});
    return {msg: 'User account updated'};
  } catch (error) {
    return {'error': error};
  }
}