import Payment from '../Domain/Payment';
import IPayment from '../intefaces/IPayment';
import PaymentODM from '../Models/PaymentODM';

class TransferService {
  private isValidKey(key: string): boolean {
    const cpfRegex = /^\d{3}.\d{3}.\d{3}-\d{2}$/;
    return cpfRegex.test(key);
  }

  private createPaymentDomain(payment: IPayment | null): Payment | null {
    if (payment) {
      return new Payment(
        payment.payByPerson,
        payment.payToPerson,
        payment.amount,
        payment.key,
        payment.id,
      );
    }
    return null;
  }

  public async transfer(payment: IPayment) {
    if (!this.isValidKey(payment.key)) throw new Error('Invalid Key!');
    // Criar instância da Model de Payment usando Mongoose
    const paymentODM = new PaymentODM();
    // Inserir os dados no banco
    const newPayment = await paymentODM.create(payment);
    // Retornar os dados com o id
    return this.createPaymentDomain(newPayment);
  }
}

export default TransferService;