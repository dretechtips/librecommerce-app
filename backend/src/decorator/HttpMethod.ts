import { Request, Response, NextFunction, response } from "express";
import { ServerError, HttpError } from "../type/Error";
import { RequestHandler, Dictionary } from "express-serve-static-core";

// Reference Catch Decorator TS

function ErrorHandler(res: Response, err: Error, clientMsg: string) {
  res.sendError(err, clientMsg);
}

export function HttpMethod(method: "GET" | "PATCH" | "POST" | "DELETE" | "ALL", ClientErrorMsg: string): Function {
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
    try {
      const original: Function = descriptor.value;
      if(original.arguments[0] instanceof Request && original.arguments[1] instanceof Response && typeof original.arguments[2] === "function") {
        descriptor.value = function (req: Request, res: Response, next: NextFunction) {
          try {
            if (req.method !== method && method != "ALL") {
              throw new ProgramError(method.toUpperCase() + " method wasn't implemented correctly.");
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
      }
      else if(original.arguments[0] instanceof Request && original.arguments[2] instanceof Response) {
        descriptor.value = function (req: Request, res: Response) {
          try {
            if (req.method !== method && method != "ALL") {
              throw new ProgramError(method.toUpperCase() + " method wasn't implemented correctly.");
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
      }
      else 
        throw new ProgramError("The arguments passed into the function cannot be accepted.");
      
      return descriptor;
    }
    catch(e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
}

type Methods = "GET" | "PATCH" | "POST" | "DELETE" | "ALL";



export const HttpFunction
  = (m: Methods, errMsg: string, cb: (req: Request, res: Response, next: NextFunction) => any) => {
    return (req: Request, res: Response, next?: NextFunction) => {
      try {
        if (req.method !== m)
          throw new HttpError("The specified method and the actual methods are not equal.");
        if (req && res && next) {
          const result = cb.call(this, req, res, next);
          res.send({ success: true });
          return result;
        }
        else if (req && res) {
          const result =  cb.call(this, req, res);
          res.send({ success: true });
          return result;
        }
        else if (req)
          throw new HttpError("Server has no response!");
        
      }
      catch (e) {
        res.sendError(e, errMsg);
      }
    }
}

