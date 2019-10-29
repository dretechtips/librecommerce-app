import { Request, Response, NextFunction } from 'express';
import { HttpMethod, HttpFunction } from '../decorator/HttpMethod';

export const getInterface = HttpFunction(
  'GET',
  'System was unable to fetch the client front end files.',
  (req, res) => {
    return;
  }
);

export const verify = HttpFunction(
  'ALL',
  'System was unable to verify this client.',
  (req, res, next) => {
    return;
  }
);
