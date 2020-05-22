import { Controller } from "@nestjs/common";
import TransactionService from "./Transaction.service";

export const prefix = "transaction";

@Controller(prefix)
export class TransactionController {

  constructor(private readonly transaction: TransactionService) {}

}

export default TransactionController;