import { Response } from "express-serve-static-core";

export type HttpErrorHandler = (error: any, clientMsg: string) => Response; 

export function httpErrorHandler(error: any, clientMsg: string): Response {
  try {
    const ex: Error = error;
    hconsole.error(ex);
    this.send({ success: false, error: clientMsg });
    return this;
  }
  catch (e) {
    const exx: TypeError = e;
    this.send({ success: false, error: "System was unable to process this error." });
    return this;
  }
}