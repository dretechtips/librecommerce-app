import { NextFunction, Request, Response } from "express";
import { IPAddress } from "../type/Location";
import { HttpMethod  } from "../decorator/HttpMethod";
import fs = require('fs');
import { getFrontend } from "../helper/Frontend";

export function monitor(req: Request, res: Response, next: NextFunction) {
  try {
    const ip: IPAddress = new IPAddress(req.ip);
    hconsole.log(`An ADMIN with the IP address ${ip.toString()}
      has made an attempted change to the ${req.path}`);
    return next();
  }
  catch (e) {
    res.sendError(e, "System cannot log these changes");
  }
}

export function getInterface(req: Request, res: Response) {
  const filePath: string = getFrontend(req.headers['content-type'] || req.header('context-type'), './client/client.html', "./client/client.css", './client/client.js');
  res.sendFile(filePath);
}





