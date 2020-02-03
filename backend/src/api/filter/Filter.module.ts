import { Module } from "@nestjs/common";
import TextModule from "./text/Text.module";

@Module({
  controllers: [],
  imports: [TextModule]
})
export class FilterModule {}

export default FilterModule;
