import { Module } from "@nestjs/common";
import VariationController from "./Variation.controller";

@Module({
  controllers: [VariationController]
})
export class VariationModule {}

export default VariationModule;
