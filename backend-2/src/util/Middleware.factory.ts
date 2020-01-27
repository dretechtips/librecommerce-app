import Model from "src/model/Model";
import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { ClassProvider, Provider } from "@nestjs/common/interfaces";

export function ValidateCookieIDMiddleware(
  prefix: string,
  model: ReturnType<typeof Model>
) {
  return class Middleware implements NestMiddleware {
    public async use(req: Request, res: Response, next: Function) {
      const id: string = req.cookies[prefix];
      const doc = await model.getSelfByID(id);
      if (!doc) throw new Error("Invalid " + prefix + " ID");
      return next();
    }
  };
}

export function LoadCookieIDIntoProviderMiddleware<T>(
  prefix: string,
  model: ReturnType<typeof Model>,
  load: (provider: T) => (id: string) => void
) {
  class Middleware implements NestMiddleware {
    constructor(private readonly props: T) {}
    public use() {}
  }
  return [ValidateCookieIDMiddleware(prefix, model)];
}
