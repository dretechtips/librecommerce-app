import { Injectable } from "@nestjs/common";
import { InjectModel } from "src/app/common/model/Model.decorator";
import { RefundTransaction } from "./RefundTransaction.model";
import Service from "src/app/common/service/Service.factory";
import { prop } from "@typegoose/typegoose";

@Injectable()
export class RefundTransactionService extends Service<RefundTransaction> {
  constructor(
    @InjectModel(RefundTransaction) public readonly model: RefundTransaction
  ) {
    super();
  }
}

export default RefundTransactionService;
