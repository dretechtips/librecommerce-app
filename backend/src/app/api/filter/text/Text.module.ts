import { Module } from "@nestjs/common";
import TextController from "./Text.controller";

@Module({
  controllers: [TextController]
})
export class TextModule {}

export default TextModule;
