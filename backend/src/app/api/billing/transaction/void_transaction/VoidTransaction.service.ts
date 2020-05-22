import Service from "src/app/common/service/Service.factory";
import { VoidTransaction } from "./VoidTransaction.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "src/app/common/model/Model.decorator";

@Injectable()
export class VoidTransactionService extends Service<VoidTransaction> {
  constructor(
    @InjectModel(VoidTransaction) public readonly model: VoidTransaction
  ) {
    super();
  }
}

export default VoidTransactionService;
