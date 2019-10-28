/// <reference path="../libs/global.d.ts" />
import { Response } from "express";
import { HttpError } from "../type/Error";

export type HttpErrorHandler = (error: any, clientMsg: string) => Response; 

export function httpErrorHandler(error: any, clientMsg: string): Response {
  try {
    const ex: Error = error;
    hconsole.error(ex);
    if (ex instanceof HttpError && ex.canNofifyClient())
      this.send({ success: false, error: ex.message });
    else
      this.send({ success: false, error: clientMsg });
    return this;
  }
  catch (e) {
    const exx: TypeError = e;
    this.send({ success: false, error: "System was unable to process this error." });
    return this;
  }
}