import { IDValidationPipeFactory } from "src/app/common/pipe/Pipe.factory";
import TransactionService from "./Transaction.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ValidateTransactionIDPipe extends IDValidationPipeFactory(
  TransactionService
) {}
