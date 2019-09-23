/// <reference path="express.d.ts" />

import express = require("express");
import e = require("../../node_modules/@types/express/index");
import { httpErrorHandler } from "../helper/HttpErrorHandler";

express.extend = function (): e.Express {
  e.response.sendError = httpErrorHandler.bind(e.response);
  return e();
}