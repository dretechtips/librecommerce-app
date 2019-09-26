import { Response } from "express";
import fs = require('fs');

export type GetFrontend = (contentType: string, htmlPath: string, cssPath: string, jsPath: string) => string;

export function getFrontend (contentType: string, htmlPath: string, cssPath: string, jsPath: string): string {
  let path: string;
  switch(contentType) {
    case "text/html":
      path = htmlPath;
      break;
    case "text/css":
      path = cssPath;
      break;
    case "application/javascript":
      path  = jsPath;
      break;
  }
  return path;
}