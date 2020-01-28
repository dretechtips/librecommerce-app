import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { FormController, Form } from "src/interface/Form.interface";

export function FormMiddlewareFactory<T>(controller: FormController<T>[]) {
  class FormMiddleware implements NestMiddleware {
    public use(req: Request, res: Response, next: Function) {
      res.locals[c];
    }
  }
}
