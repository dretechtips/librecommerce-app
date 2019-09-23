import { HttpErrorHandler } from "../helper/HttpErrorHandler";
import express = require("express");

declare global {
  namespace Express {
    interface Response {
      sendError: HttpErrorHandler
    }
  }
}

declare module "express" {
  function extend(): express.Express;
}