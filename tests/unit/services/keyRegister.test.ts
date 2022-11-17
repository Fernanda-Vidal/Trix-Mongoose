import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IKey from '../../../src/intefaces/IKey';
import Key from '../../../src/Domain/Key/Key';
import KeyService from '../../../src/Services/KeyService';

const RESULT_ERROR = 'Invalid Key';

describe('Deveria validar e criar chaves', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Criando uma chave de tipo CPF com SUCESSO', async function () {
    // Arrange
    const keyInput: IKey = {
      value: '478.966.190-32',
      owner: 'Jack C.',
      type: 'cpf',
    };
    const keyOutput: Key = new Key(
      '478.966.190-32',
      'Jack C.',
      'cpf',
      '633ec9fa3df977e30e993492',
    );
    sinon.stub(Model, 'create').resolves(keyOutput);

    // Act
    const service = new KeyService();
    const result = await service.register(keyInput);

    // Assert
    expect(result).to.be.deep.equal(keyOutput);
  });
  
  it('Criando uma chave de tipo CPF inválida', async function () {
    // Arrange
    const keyInput: IKey = {
      value: '478.966.190-32XX',
      owner: 'Jack C.',
      type: 'cpf',
    };
    sinon.stub(Model, 'create').resolves({});

    // Act
    try {
      const service = new KeyService();
      await service.register(keyInput);
    } catch (error) {
      // Assert
      expect((error as Error).message).to.be.equal(RESULT_ERROR);
    }
  });
  
  it('Criando chave de tipo Phone Number com SUCESSO', async function () {
    // Arrange
    const keyInput: IKey = {
      value: '+55 (18) 95687-9652',
      owner: 'Jack C.',
      type: 'phonenumber',
    };
    const keyOutput: Key = new Key(
      '+55 (18) 95687-9652',
      'Jack C.',
      'phonenumber',
      '633ec9fa3df977e30e993492',
    );
    sinon.stub(Model, 'create').resolves(keyOutput);

    // Act
    const service = new KeyService();
    const result = await service.register(keyInput);

    // Assert
    expect(result).to.be.deep.equal(keyOutput);
  });
  
  it('Criando chave de tipo Phone Number é inválida', async function () {
    // Arrange
    const keyInput: IKey = {
      value: '95687-9652',
      owner: 'Jack C.',
      type: 'phonenumber',
    };
    sinon.stub(Model, 'create').resolves({});

    // Act
    try {
      const service = new KeyService();
      await service.register(keyInput);
    } catch (error) {
      // Assert
      expect((error as Error).message).to.be.equal(RESULT_ERROR);
    }
  });
});
