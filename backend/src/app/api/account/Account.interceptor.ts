import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import LoginService from "../login/Login.service";
import { AccountType } from "./Account.interface";

@Injectable()
export class RestrictAccountInteceptor implements NestInterceptor {
  protected allowed: AccountType[] = [];
  constructor(private readonly login: LoginService) {}
  public intercept(
    context: ExecutionContext,
    call: CallHandler
  ): Observable<any> {
    // Get Login ID
    // Get Get Account From Login ID
    // With the Account get Account Type
    // If the account type matches the the value passed into the decorator than proceed
    // Otherwise throw no permission error
    return call.handle();
  }
}
