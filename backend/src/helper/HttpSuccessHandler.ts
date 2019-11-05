import { Request, Response } from 'express';

export function HttpSuccessHandler(req: Request, res: Response) {
  res.send({ success: true });
}

export default HttpSuccessHandler;
