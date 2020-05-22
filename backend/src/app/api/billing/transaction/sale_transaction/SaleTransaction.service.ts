import Service from "src/app/common/service/Service.factory";
import SaleTransaction from "./SaleTransaction.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "src/app/common/model/Model.decorator";

@Injectable()
export class SaleTransactionService extends Service<SaleTransaction> {
  constructor(
    @InjectModel(SaleTransaction) public readonly model: SaleTransaction
  ) {
    super();
  }
}

export default SaleTransactionService;
