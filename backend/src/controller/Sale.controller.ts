import { RequestHandler } from "express";
import * as TransactionController from "./Transaction.controller";
import * as OrderController from "./Order.controller";
import * as ShippingController from "./Shipping.controller";
import * as CartController from "./Cart.controller";
import { HttpFunction } from "../decorator/Http.decorator";

export const Create = function(type: "admin" | "client"): RequestHandler[] {};
