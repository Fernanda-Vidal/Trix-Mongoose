import {
  Model, Schema, model, models, isValidObjectId, UpdateQuery } from 'mongoose';
import IPayment from '../intefaces/IPayment';

class PaymentODM {
  private schema: Schema; // Atributo para o "molde"
  private model: Model<IPayment>; // Atributo para criar coleção e fornecer acesso ao banco
  
  constructor() {
    this.schema = new Schema<IPayment>({
      payByPerson: { type: String, required: true },
      payToPerson: { type: String, required: true },
      amount: { type: Number, required: true },
      key: { type: String, required: true },
      status: { type: Number },
    });
    this.model = models.Payment || model('Payment', this.schema); // Antes de criar o Schema, verificar se o schema já existe. Caso não exista, o schema será criado. 
  }
  
  public async create(payment: IPayment): Promise<IPayment> {
    return this.model.create({ ...payment });
  }

  public async update(id: string, obj: Partial<IPayment>):
  Promise<IPayment | null> {
    if (!isValidObjectId(id)) throw Error('Invalid Mongo id');
    
    return this.model.findByIdAndUpdate(
      { _id: id },
      { ...obj } as UpdateQuery<IPayment>,
    );    
  }
}
  
export default PaymentODM;