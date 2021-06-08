import { Schema, model, Document } from 'mongoose';

export interface ITransaction extends Document {
  commerce:string,
  amount:number,
  state:string,
  account:Schema.Types.ObjectId
}

const transactionSchema = new Schema<ITransaction>({
  commerce:{},
  amount:{},
  state:{},
  account:{}
}, {
  timestamps: true
});

export default model<ITransaction>('Transaction', transactionSchema);