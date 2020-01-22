import { Request, Response, NextFunction, RequestHandler } from "express";
import { HttpFunction } from "../decorator/Http.decorator";
import Controller from "../factory/Controller";
import Shipping from "../model/Shipping";
import * as OrderController from "./Order.controller";

export const controller = new Controller("shipping", Shipping);

/**
 * Create a new shipping from the client.
 */
export const Create = function(): RequestHandler {
  return controller.create();
};

export const Delete = controller.delete();
