import { Module } from "@nestjs/common";
import EmailController from "./Email.controller";
import EmailService from "./Email.service";

@Module({
  controllers: [EmailController],
  providers: [EmailService]
})
export class EmailModule {}

export default EmailModule;
