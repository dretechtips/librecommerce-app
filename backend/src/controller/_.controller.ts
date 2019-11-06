/// <reference path="../libs/global.d.ts"/>
import { HttpFunction } from '../decorator/Http.decorator';
import { NextFunction } from 'express';
import Model from '../model/Model';
import Order from '../model/Order';
import { Request } from 'express';
import { Props, State, DefaultProps } from '../interface/Model.interface';

class Controller<State, Props, Type extends Model<State, Props>> {
  private _type: { new (id: string): Type };
  private _storage: keyof Express.Request;
  constructor(
    type: { new (id: string): Type },
    storage: keyof Express.Request
  ) {
    this._type = type;
    this._storage = storage;
  }
  public get(error: string) {
    return HttpFunction(error, (req, res, next) => {
      const { id } = req.body[this._storage] as DefaultProps;
      const item: Type = new this._type(id);
      req[this._storage] = <any>item;
      return next();
    });
  }
  public update<U extends keyof Props>(error: string) {
    return [
      this.get(error),
      HttpFunction(error, (req, res, next) => {
        const body = req.body[this._storage] as Partial<Pick<Props, U>> &
          Pick<DefaultProps, 'id'>;
        const item = req[this._storage];
        item.update(body);
        return next();
      })
    ];
  }
  public add(error: string) {
    return [this.get(error)];
  }
  public remove() {}
}

export default Controller;
