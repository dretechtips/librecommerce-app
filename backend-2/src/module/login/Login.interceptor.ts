import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Request, Response, NextFunction } from "express";
import path from "path";
import { prefix } from "./Login.controller";
import LoginService from "./Login.service";

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  constructor(private readonly login: LoginService) {}
  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const errorHandler: NextFunction = context.switchToHttp().getNext();
    this.requestHandler(req, errorHandler);
    return next.handle().pipe();
  }
  private requestHandler(req: Request, errorHandler: NextFunction) {
    if (req.path === path.join("api", "login")) return;
    if (
      typeof req.cookies[prefix] !== "string" ||
      !this.login.verifyToken(req.ip, req.cookies[prefix])
    )
      errorHandler(
        "Please login to the system, before you try to use the API."
      );
  }
}
