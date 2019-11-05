import { Response, Request } from 'express';
import { HttpError } from '../type/Error';
import { NextFunction } from 'connect';

export function HttpErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  hconsole.error(error);
  res.status(500).send({ success: false, error: error.message });
  return;
}

export default HttpErrorHandler;
