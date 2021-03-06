import { Schema, model, Document } from 'mongoose';

export interface IAccount extends Document {
  accountName:string,
  typeAccount:string,
  state:string,
  user:string
}

const accountSchema = new Schema<IAccount>({
  accountName:{},
  typeAccount:{},
  state:{},
  user:{}
}, {
  timestamps: true
});

export default model<IAccount>('Account', accountSchema);