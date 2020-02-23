import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import {
  ExtractDocFromID,
  IDsValidationPipeFactory,
  IDValidationPipeFactory,
  ValidationPipeFactory
} from "src/app/common/pipe/Pipe.factory";
import { AccountType } from "./Account.interface";
import AccountService from "./Account.service";

@Injectable()
export class ValidateAccountIDs extends IDsValidationPipeFactory(
  AccountService
) {}

@Injectable()
export class ValidateAccountID extends IDValidationPipeFactory(
  AccountService
) {}

@Injectable()
export class ValidateAccount extends ValidationPipeFactory(AccountService) {}

@Injectable()
export class ExtractAccountDocFromID extends ExtractDocFromID(AccountService) {}

@Injectable()
export class ExtractAccountTypeFromID
  implements PipeTransform<string, Promise<AccountType>> {
  constructor(private account: AccountService) {}
  public transform(value: any, meta: ArgumentMetadata) {
    return this.account.getAccountType(value);
  }
}
