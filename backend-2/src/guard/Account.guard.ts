import { CanActivate, ExecutionContext } from "@nestjs/common";
import Model from "src/model/Model";
import { Request, Response } from "express";

export class AccountLoginGuard implements CanActivate {
  constructor(
    private readonly prefix: string,
    private readonly model: ReturnType<typeof Model>
  ) {}
  public canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest() as Request;
    const res = context.switchToHttp().getResponse() as Response;
    const prefix = this.prefix;
    if (req.path !== "/api/" + this.prefix + "/login") return true;
    return this.verify(req, res);
  }
  private verify(req: Request, res: Response): boolean {
    const prefix = this.prefix;
    if (typeof req.cookies[prefix] !== "string") return false;
    if (!this.model.isValidID(req.cookies[prefix])) return false;
    return true;
  }
}
