import { Schema, model, Document } from 'mongoose';

export interface IAccount extends Document {
  accountName:string,
  user:string
}

const accountSchema = new Schema<IAccount>({
  accountName:{},
  user:{}
}, {
  timestamps: true
});

export default model<IAccount>('Account', accountSchema);