import { Request, Response, RequestHandler } from 'express';
import { HttpFunction } from '../decorator/Http.decorator';

export const get = HttpFunction(
  'System was unable to find the Alert!',
  (req, res, next) => {}
);

export const add = HttpFunction(
  'GET',
  'System was unable to create a new alert.',
  (req, res, next) => {}
);

export const remove = HttpFunction(
  'DELETE',
  'System was unable to create a new alert.',
  (req, res, next) => {}
);

export const list = HttpFunction(
  'GET',
  'System was unable to list this users alerts.',
  (req, res, next) => {}
);
