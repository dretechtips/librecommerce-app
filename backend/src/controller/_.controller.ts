/// <reference path="../libs/global.d.ts"/>
import { HttpFunction } from '../decorator/Http.decorator';
import { NextFunction } from 'express';
import Model from '../model/Model';
import { Request } from 'express';
import { Props, State, DefaultProps } from '../interface/Model.interface';
import database from 'database';
import Order from '../model/Order';

class Controller<Constructor, State, Props, Type extends Model<State, Props>> {
  private _type: { new (id: Constructor | string): Type };
  private _storage: keyof Express.Request;
  constructor(
    type: { new (id: string | Constructor): Type },
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
  public update<U extends keyof Props>(
    error: string,
    rewritable: U,
    gets?: (keyof Express.Request)[]
  ) {
    return [
      this.get(error),
      HttpFunction(error, (req, res, next) => {
        const param: Partial<Pick<Props, U>> = gets
          ? {
              ...req.body[this._storage],
              ...gets.map(cur => req[cur])
            }
          : {
              ...req.body[this._storage]
            };
        const item: Model<State, Props> = req[this._storage];
        item.update(param as Partial<Props>);
        return next();
      })
    ];
  }
  public add(error: string, gets?: (keyof Express.Request)[]) {
    return HttpFunction(error, (req, res, next) => {
      const param: Constructor = gets
        ? {
            ...req.body[this._storage],
            ...gets.map(cur => req[cur])
          }
        : {
            ...req.body[this._storage]
          };
      const object = new this._type(param);
      object.add();
      return next();
    });
  }
  public remove(error: string) {
    return [
      this.get(error),
      HttpFunction(error, (req, res, next) => {
        req[this._storage].delete();
        return next();
      })
    ];
  }
  public search<Q extends keyof Props>(error: string, query?: Q) {
    return HttpFunction(error, (req, res, next) => {
      const query: Q = req.body[this._storage].query;
      const model = Model.search('PLACEHOLDER');
      const send = {};
      send['success'] = true;
      send[this._storage] = model.toPrimObj();
      res.send({ ...send });
    });
  }
}

export default Controller;
