import { PipeTransform, ArgumentMetadata, Injectable } from "@nestjs/common";
import { IDsOnly } from "src/util/Types";
import {
  IDsValidationPipeFactory,
  IDValidationPipeFactory,
  ValidationPipeFactory,
  ExtractDocFromID
} from "src/app/common/pipe/Pipe.factory";
import Account from "./Account.model";
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
