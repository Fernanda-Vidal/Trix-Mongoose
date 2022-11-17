import IKey from '../../intefaces/IKey';
import IValid from '../../intefaces/IValid';
import KeyTypes from '../../utils/KeyTypes';

class PhoneNumber implements IKey, IValid {
  readonly value: string;
  readonly owner: string;
  readonly type: string;
  
  constructor(value: string, owner: string) {
    if (!this.isValid(value)) throw Error('Invalid Key');
    this.value = value;
    this.owner = owner;
    this.type = KeyTypes.PHONE_NUMBER;
  }

  isValid(value: string): boolean {
    const regex = /\+\d{2}\s\(\d{2}\)\s\d{4,5}-?\d{4}/g;
    return regex.test(value);
  }
}

export default PhoneNumber;