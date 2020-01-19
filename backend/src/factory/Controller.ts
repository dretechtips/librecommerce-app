/// <reference path="../libs/global.d.ts"/>
import { Request, Response, RequestHandler, NextFunction } from "express";
import * as Mongoose from "mongoose";
import { HttpFunction } from "../decorator/Http.decorator";
import { ClientError } from "../type/Error";
import { ModelType } from "../interface/Model.interface";
import Model from "./Model";

export class Controller {
  private bodyObjKey: string;
  private Model: ReturnType<typeof Model>;
  constructor(bodyObjKey: string, model: ReturnType<typeof Model>) {
    this.bodyObjKey = bodyObjKey;
    this.Model = model;
  }
  public getBodyObjKey() {
    return this.bodyObjKey;
  }
  public create(middlewares: RequestHandler[]) {
    [
      ...middlewares,
      HttpFunction(
        this.bodyObjKey.toUpperCase() + " was unable to created",
        async (req, res) => {
          const doc = new this.Model(req.body[this.bodyObjKey]);
          doc.validate();
          doc.save();
        }
      )
    ];
  }

  public read() {
    [
      HttpFunction(
        this.bodyObjKey.toUpperCase() + " was unable to be read",
        async (req, res) => {
          const { id } = req.body[this.bodyObjKey];
          const self = await this.Model.getSelfByID(id);
          if (!self)
            throw new Error("Invalid ID for " + this.bodyObjKey.toUpperCase());
          // Res Send Data
        }
      )
    ];
  }

  public delete() {}

  public update() {}

  public search() {}
}

export default Controller;
