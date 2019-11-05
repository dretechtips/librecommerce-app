import { Request, Response, NextFunction, response } from "express";
import { ServerError, HttpError } from "../type/Error";
import { RequestHandler, Dictionary } from "express-serve-static-core";

// Reference Catch Decorator TS

export function HttpMethod(
  method: "GET" | "PATCH" | "POST" | "DELETE" | "ALL",
  ClientErrorMsg: string
): Function {
  return function(
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    try {
      const original: Function = descriptor.value;
      if (
        original.arguments[0] instanceof Request &&
        original.arguments[1] instanceof Response &&
        typeof original.arguments[2] === "function"
      ) {
        descriptor.value = function(
          req: Request,
          res: Response,
          next: NextFunction
        ) {
          try {
            if (req.method !== method && method != "ALL") {
              throw new ServerError(
                method.toUpperCase() + " method wasn't implemented correctly."
              );
            } else {
              const next = original.apply(this, [req, res]);
              if (
                next &&
                typeof next.then === "function" &&
                typeof next.catch === "function"
              ) {
                return next.catch((error: Error) => {
                  next(error);
                });
              }
              res.send({ success: true });
            }
          } catch (e) {
            next(e);
          }
        };
      } else if (
        original.arguments[0] instanceof Request &&
        original.arguments[2] instanceof Response
      ) {
        descriptor.value = function(
          req: Request,
          res: Response,
          next: NextFunction
        ) {
          try {
            if (req.method !== method && method != "ALL") {
              throw new ServerError(
                method.toUpperCase() + " method wasn't implemented correctly."
              );
            } else {
              const next = original.apply(this, [req, res]);
              if (
                next &&
                typeof next.then === "function" &&
                typeof next.catch === "function"
              ) {
                return next.catch((error: Error) => {
                  next(error);
                });
              }
              res.send({ success: true });
            }
          } catch (e) {
            next(e);
          }
        };
      } else
        throw new ServerError(
          "The arguments passed into the function cannot be accepted."
        );

      return descriptor;
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  };
}

type Methods = "GET" | "PATCH" | "POST" | "DELETE" | "ALL";

export const HttpFunction = (
  errMsg: string,
  cb: (req: Request, res: Response, next: NextFunction) => any
) => {
  return (req: Request, res: Response, next: NextFunction): any => {
    try {
      const result = cb.call(this, req, res, next);
      return result;
    } catch (e) {
      if (e instanceof HttpError) {
        hconsole.error(e);
        e.message = errMsg;
        next(e);
      } else if (e instanceof Error) next(e);
      return e as Error;
    }
  };
};
