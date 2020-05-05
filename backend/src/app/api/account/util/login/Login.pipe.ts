import { Injectable, PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { IDValidationPipeFactory } from "src/app/common/pipe/Pipe.factory";
import LoginService from "./Login.service";

@Injectable()
export class ValidateLoginID extends IDValidationPipeFactory(LoginService) {}

@Injectable()
export class GetAccountIDFromLoginID implements PipeTransform {
  constructor(private readonly login: LoginService) {}
  public async transform(value: any, meta: ArgumentMetadata) {
    const login = await this.login.get(value);
    return login.accountID;
  }
}
