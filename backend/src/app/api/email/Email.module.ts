import { Global, Module } from "@nestjs/common";
import EmailController from "./Email.controller";
import EmailService from "./Email.service";

@Global()
@Module({
  controllers: [EmailController],
  providers: [EmailService]
})
export class EmailModule {}

export default EmailModule;
