import { Request, Response, NextFunction } from 'express';
import { HttpMethod, HttpFunction } from '../decorator/Http.decorator';

export const getInterface = HttpFunction(
  'System was unable to fetch the client front end files.',
  (req, res) => {
    return;
  }
);

export const verify = HttpFunction(
  'System was unable to verify this client.',
  (req, res, next) => {
    return;
  }
);
