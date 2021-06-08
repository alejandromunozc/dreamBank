import { Schema, model, Document } from 'mongoose';

export enum ProductType {
  'Crédito ágil',
  'Tarjeta de Crédito',
  'Cuenta de ahorros',
  'Leasing de vivienda'
}

export interface IAccount extends Document {
  accountName:string,
  typeAccount:string,
  user:string
}

const accountSchema = new Schema<IAccount>({
  accountName:{},
  typeAccount:{},
  user:{}
}, {
  timestamps: true
});

export default model<IAccount>('Account', accountSchema);