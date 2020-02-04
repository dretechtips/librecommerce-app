import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { IDsOnly } from "src/util/Types";
import { IDsValidationPipeFactory } from "src/util/Pipe.factory";
import Account from "./Account.model";

export class ValidateAccountIDs extends IDsValidationPipeFactory(Account) {}
