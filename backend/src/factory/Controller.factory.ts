/// <reference path="../libs/global.d.ts"/>
import { HttpFunction } from '../decorator/Http.decorator';
import { NextFunction } from 'express';
import Model, { DatabaseSearchIDs } from './Model.factory';
import { Request } from 'express';
import Order from '../model/Order';
import { PropSafe, DefaultProps, IModel } from '../interface/Model.interface';

/**
 * @typedef C Constructor
 * @typedef S State
 * @typedef I Interface
 */

class Controller<I extends PropSafe, T extends Model<any, any, I>> {
  private _model: { new: (constructor: I) => T } & IModel;
  private _storage: keyof Express.Request;
  constructor(
    model: { new: (constructor: I) => T } & IModel,
    storage: keyof Express.Request
  ) {
    this._model = model;
    this._storage = storage;
  }
  public get(error?: string) {
    if (!error) error = `The system was unable to get a ${this._storage}!`;
    return HttpFunction(error, async (req, res, next) => {
      const { id } = req.body[this._storage] as DefaultProps;
      const item: T = await DatabaseSearchIDs<I, T>(this._model.collection, [
        id
      ]);
      req[this._storage] = <any>item;
      return next();
    });
  }
  public update<U extends keyof I>(
    rewritable: U,
    error?: string,
    gets?: (keyof Express.Request)[]
  ) {
    if (!error) error = `The system was unable to get a ${this._storage}!`;
    return [
      this.get(error),
      HttpFunction(error, (req, res, next) => {
        const param: Partial<Pick<I, U>> = gets
          ? {
              ...req.body[this._storage],
              ...gets.map(cur => req[cur])
            }
          : {
              ...req.body[this._storage]
            };
        const item = req[this._storage];
        item.update(param as Partial<I>);
        return next();
      })
    ];
  }
  public add(error?: string, gets?: (keyof Express.Request)[]) {
    return HttpFunction(error, (req, res, next) => {
      const body: I = req.body[this._storage];
      const param: Constructor = gets
        ? {
            ...req.body[this._storage],
            ...gets.map(cur => req[cur])
          }
        : {
            ...req.body[this._storage]
          };
      const object = new this._model(param);
      object.add();
      return next();
    });
  }
  public remove(error?: string) {
    return [
      this.get(error),
      HttpFunction(error, (req, res, next) => {
        req[this._storage].delete();
        return next();
      })
    ];
  }
  public search<Q extends keyof Props>(error?: string, query?: Q) {
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
