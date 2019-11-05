/// <reference path="../libs/global.d.ts"/>
import { HttpFunction } from "../decorator/Http.decorator";
import { NextFunction } from "express";
import Model from "../model/Model";
import Order from "../model/Order";
import { Request } from "express";

export function get<T extends Model>(
  error: string,
  type: { new (id: string): T },
  storage: keyof Express.Request
) {
  HttpFunction(error, (req, res, next) => {
    const { id } = req.body[name];
    const item: T = new type("string");
    req[storage] = item;
  });
}
get("test", Order, "order");
get("THis is an error", Order);

export function add(error: string) {
  return HttpFunction(error, (req, res, next) => {});
}

export function remove() {}

export function update() {}
