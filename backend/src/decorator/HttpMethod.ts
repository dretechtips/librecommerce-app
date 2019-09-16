import { Request, Response } from "express-serve-static-core";
import { default as hconsole } from "../model/Console";

export function HttpMethod(method: "GET" | "PATCH" | "POST" | "DELETE"): Function {
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor): void {
    const original: Function = descriptor.value;
    descriptor.value = function (req: Request, res: Response) {
      if (req.method !== method) {
        res.send({ success: false, error: method.toUpperCase() + " method wasn't implemented correctly." });
        return null;
      }
      else {
        const next = original.apply(this, [req, res]);
        return next;
      }
    }
    }
}