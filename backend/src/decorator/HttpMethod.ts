import { Request, Response } from "express-serve-static-core";

// Reference Catch Decorator TS

function ErrorHandler(res: Response, err: Error, clientMsg: string) {
  res.sendError(err, clientMsg);
}

export function HttpMethod(method: "GET" | "PATCH" | "POST" | "DELETE", ClientErrorMsg: string): Function {
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
    const original: Function = descriptor.value;
    descriptor.value = function (req: Request, res: Response) {
      try {
        if (req.method !== method) {
          throw new Error(method.toUpperCase() + " method wasn't implemented correctly.");
        }
        else {
          const next = original.apply(this, [req, res]);
          if (next && typeof next.then === 'function' && typeof next.catch === 'function') {
            return next.catch((error: Error) => {
              ErrorHandler(res, error, ClientErrorMsg);
            })
          }
          res.send({ success: true });
        }
      }
      catch (e) {
        ErrorHandler(res, e, ClientErrorMsg);
      }
    }
    return descriptor;
  }
}