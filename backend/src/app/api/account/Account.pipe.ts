import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import AccountService from "./Account.service";
import { AccountType } from "./type/Type.interface";

@Injectable()
export class IDToAccountTypePipe
  implements PipeTransform<string, Promise<AccountType>> {
  constructor(private account: AccountService) {}
  public transform(value: any, meta: ArgumentMetadata) {
    return this.account.getType(value);
  }
}
