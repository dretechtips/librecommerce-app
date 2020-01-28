import { Injectable } from "@nestjs/common";
import TagService from "src/common/services/Tag.service";
import { TransactionDOT } from "./Transaction.interface";

@Injectable()
export class TransactionService {
  constructor(public readonly tag: TagService<TransactionDOT>) {}
}

export default TransactionService;