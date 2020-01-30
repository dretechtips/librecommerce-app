import { Injectable } from "@nestjs/common";
import ConfigService from "src/common/services/Config.service";
import { PayflowCredientals } from "./Payflow.interface";

@Injectable()
export class PayflowService {
  private credientals: PayflowCredientals | null = null;
  constructor(private readonly config: ConfigService) {
    this.init();
  }
  private async init() {
    this.credientals = await this.config.get<PayflowCredientals>(
      "paypal",
      "payflow"
    );
  }
}

export default PayflowService;
