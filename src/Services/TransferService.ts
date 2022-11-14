import Payment from '../Domain/Payment';

class TransferService {
  private isValidKey(key: string): boolean {
    const cpfRegex = /^\d{3}.\d{3}.\d{3}-\d{2}$/;
    return cpfRegex.test(key);
  }

  public async transfer(payment: IPayment) {
    if (!this.isValidKey(payment.key)) throw new Error('Invalid Key!');
    // Criar instância da Model de Payment usando Mongoose
    // Inserir os dados no banco
    // Retornar os dados com o id
  }
}

export default TransferService;