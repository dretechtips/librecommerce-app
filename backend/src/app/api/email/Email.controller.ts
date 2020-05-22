import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseInterceptors
} from "@nestjs/common";
import { RestrictAccess } from "../account/user/login/Login.decorator";
import { AccountType } from "../account/type/Type.interface";
import { ValidateEmailInterceptor } from "./Email.interceptor";
import { EmailDOT } from "./Email.interface";
import { ValidateEmailIDPipe } from "./Email.pipe";
import EmailService from "./Email.service";

export const prefix = "email";

@Controller(prefix)
@RestrictAccess(AccountType.COMPANY, AccountType.EMPLOYEE, AccountType.STORE)
export class EmailController {
  constructor(private readonly email: EmailService) {}

  @Post("send")
  @UseInterceptors(ValidateEmailInterceptor)
  public async send(@Body(prefix) email: EmailDOT) {
    await this.email.send(email);
  }
  @Delete("cancel/:id")
  public async cancel(@Param("id", ValidateEmailIDPipe) id: string) {
    await this.email.cancel(id);
  }
}

export default EmailController;
