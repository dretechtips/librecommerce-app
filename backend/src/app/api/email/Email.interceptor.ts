import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import LoginService from "../account/user/login/Login.service";
import { prefix } from "./Email.controller";
import EmailService from "./Email.service";

@Injectable()
export class ValidateEmailInterceptor implements NestInterceptor {
  constructor(
    private readonly email: EmailService,
    private readonly login: LoginService
  ) {}
  public async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();
    const email = req.body[prefix];
    if (!(await this.email.validateDOT(email))) throw new Error("Invalid DOT");
    return next.handle().pipe();
  }
}
