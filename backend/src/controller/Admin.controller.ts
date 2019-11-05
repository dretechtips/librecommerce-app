import { NextFunction, Request, Response } from 'express';
import { IPAddress } from '../type/Location';
import { HttpFunction } from '../decorator/Http.decorator';
import fs = require('fs');
import { getFrontend } from '../helper/Frontend';

export const monitor = HttpFunction(
  'System was unable to montior your ip address',
  (req, res, next) => {
    const ip: IPAddress = new IPAddress(req.ip);
    hconsole.log(`An ADMIN with the IP address ${ip.toString()}
    has made an attempted change to the ${req.path}`);
    return next();
  }
);

export const getInterface = HttpFunction(
  'System was unable to get the interface',
  (req, res) => {
    const filePath: string = getFrontend(
      req.headers['content-type'] || req.header('context-type'),
      './client/client.html',
      './client/client.css',
      './client/client.js'
    );
    res.sendFile(filePath);
  }
);
