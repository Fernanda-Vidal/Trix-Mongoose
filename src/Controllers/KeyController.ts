import { NextFunction, Request, Response } from 'express';
import IKey from '../intefaces/IKey';
import KeyService from '../Services/KeyService';

class KeyController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: KeyService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new KeyService();
  }

  public async create() {
    const key: IKey = {
      value: this.req.body.value,
      owner: this.req.body.owner,
      type: this.req.body.type,
    };

    try {
      const newKey = await this.service.register(key);
      return this.res.status(201).json(newKey);
    } catch (error) {
      this.next(error);
    }
  }
}

export default KeyController;