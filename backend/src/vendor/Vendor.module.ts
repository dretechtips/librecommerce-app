import { Module } from "@nestjs/common";
import PaypalModule from "./paypal/Paypal.module";

@Module({
  controllers: [],
  exports: [PaypalModule],
  imports: [PaypalModule]
})
export class VendorModule {}

export default VenderModule;
