import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name:string,
  identification:number,
  password:string,
  encryptPass: (password:string) => Promise<string>,
  matchPass: (password: string) => Promise<Boolean>
}

const userSchema = new Schema<IUser>({
  name:{},
  identification:{},
  password:{}
}, {
  timestamps: true
});

userSchema.methods.encryptPass = async (password:string):Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

userSchema.methods.matchPass = async function(password:string):Promise<boolean> {
  return await bcrypt.compare(password, this.password);
}


export default model<IUser>('User', userSchema);