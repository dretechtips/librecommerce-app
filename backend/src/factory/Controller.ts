import { Request, Response, RequestHandler, NextFunction } from "express";
import * as Mongoose from "mongoose";
import { HttpFunction } from "../decorator/Http.decorator";
import { ModelType } from "../interface/Model.interface";
import Model from "./Model";
import { Await } from "../util/Types";

export class Controller<T extends ReturnType<typeof Model>> {
  private bodyObjKey: string;
  private Model: T;
  constructor(bodyObjKey: string, model: T) {
    this.bodyObjKey = bodyObjKey.toLowerCase();
    this.Model = model;
  }
  public getBodyObjKey() {
    return this.bodyObjKey;
  }
  public create() {
    return HttpFunction(
      this.bodyObjKey.toUpperCase() + " was unable to created",
      async (req, res, next) => {
        const doc = new this.Model(req.body[this.bodyObjKey]);
        doc.validate();
        doc.save();
        res.locals[this.bodyObjKey] = doc.data();
        return next();
      }
    );
  }
  /**
   * This HTTP function sends data to the client as read ONLY!
   *
   * Only reads the function if it's store in the req.locals object
   * @param fn Convert Model Data => Client Data
   */
  public read(fn?: (data: InstanceType<T>["data"]) => any) {
    return [
      ...this.validateID(),
      HttpFunction(
        this.bodyObjKey.toUpperCase() + " was unable to be read",
        async (req, res) => {
          if (!res.locals[this.bodyObjKey])
            throw new Error("ID was not properly validated.");
          const doc = new this.Model(res.locals[this.bodyObjKey]);
          doc.validate();
          if (fn) {
            res.send(fn(doc.data() as InstanceType<T>["data"]));
            return;
          }
          res.send(doc.data());
          return;
        }
      )
    ];
  }
  /**
   * Delete documents from the database with the ID passed in by the client.
   */
  public delete(): RequestHandler[] {
    return [
      ...this.validateID(),
      HttpFunction(
        this.bodyObjKey.toUpperCase() + " was unable to be deleted",
        async (req, res, next) => {
          if (!res.locals[this.bodyObjKey])
            throw new Error("ID was not properly validated.");
          const doc = new this.Model(res.locals[this.bodyObjKey]);
          doc.validate();
          doc.delete();
          return next();
        }
      )
    ];
  }

  public update() {
    return [
      ...this.validateID(),
      HttpFunction(
        this.bodyObjKey.toUpperCase() + " was unable to be updated",
        async (req, res, next) => {
          if (!res.locals[this.bodyObjKey])
            throw new Error("ID was not properly validated.");
          const doc = new this.Model(res.locals[this.bodyObjKey]);
          doc.validate();
          doc.update();
          return next();
        }
      )
    ];
  }
  /**
   * @todo Create Implementation of a search
   */
  public search() {}
  /**
   * Validates ID passed in to the body and adds it into res.locals
   *
   * res.locals[this.bodyObjKey] = DATA;
   */
  public validateID() {
    return [
      HttpFunction(
        this.bodyObjKey.toUpperCase() + " had an invalid ID passed in.",
        async (req, res, next) => {
          const { id } = req.body[this.bodyObjKey];
          const getSelfById = this.Model.getSelfByID;
          const self: Await<ReturnType<
            typeof getSelfById
          >> = await this.Model.getSelfByID(id);
          if (!self)
            throw new Error("Invalid ID for " + this.bodyObjKey.toUpperCase());
          res.locals[this.bodyObjKey] = self;
          return next();
        }
      )
    ];
  }

  public get(id?: string): RequestHandler {
    return HttpFunction(
      this.bodyObjKey.toUpperCase() + " was unable to be fetched",
      async (req, res, next) => {
        if (id) {
          const doc = await this.Model.getSelfByID(id);
          if (!doc)
            throw new Error("Invalid" + this.bodyObjKey.toUpperCase() + " key");
          res.locals[this.getBodyObjKey()] = doc.data();
          return next();
        } else {
          const bId = req.body[this.bodyObjKey].id;
          const doc = await this.Model.getSelfByID(bId);
          if (!doc)
            throw new Error("Invalid" + this.bodyObjKey.toUpperCase() + " key");
          res.locals[this.getBodyObjKey()] = doc.data();
          return next();
        }
      }
    );
  }

  // /**
  //  * Attach an id from one model to another model
  //  * @param target Used to extract out the res locals data that stores the data that needs an attached id
  //  * @param prop The res locals data prop that stores the id
  //  */
  // public attachId<T extends ReturnType<typeof Model>>(
  //   target: Controller<T>,
  //   prop: keyof ReturnType<InstanceType<T>["data"]>
  // ): RequestHandler[] {
  //   return [
  //     ...this.validateID(),
  //     HttpFunction(
  //       "System was unable to transfer ID from " +
  //         this.getBodyObjKey().toUpperCase() +
  //         " to " +
  //         target.getBodyObjKey().toUpperCase(),
  //       async (req, res, next) => {
  //         const { id } = res.locals[this.getBodyObjKey()];
  //         let replace = res.locals[target.getBodyObjKey()][prop];
  //         replace = { ...replace, [prop]: id };
  //         return next();
  //       }
  //     )
  //   ];
  // }
}

export default Controller;
