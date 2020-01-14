/// <reference path="../libs/global.d.ts"/>
import { Request, Response, RequestHandler, NextFunction } from "express";
import * as Mongoose from "mongoose";
import { HttpFunction } from "../decorator/Http.decorator";
import { ClientError } from "../type/Error";

function Verify<T extends Mongoose.Document>(
  body: string,
  ClientData: { new (data: any): T }
) {
  return HttpFunction(
    "System was unable to verify input data",
    (req, res, next) => {
      if (!req.body[body])
        throw new ClientError(
          "Client didn't provide a data to verify on " + body
        );
      const data = new ClientData(req.body[body]);
      data.validate(err => {
        if (err)
          throw new ClientError("Client didn't provide the correct data.");
        return next();
      });
    }
  );
}

export function Create<
  T extends Mongoose.Document,
  C extends Mongoose.Document
>(
  middlewares: RequestHandler[],
  body: string,
  ClientData: { new (data: any): T },
  ServerData: { new (data: any): C }
) {
  return [Verify(body, ClientData), ...middlewares, Verify(body, ServerData)];
}

export function Read() {}

export function Update() {}

export function Delete() {}

export function Search() {}
