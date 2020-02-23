import { Global, Module } from "@nestjs/common";
import AlertController from "./Alert.controller";
import AlertService from "./Alert.service";

@Global()
@Module({
  controllers: [AlertController],
  providers: [AlertService]
})
export class AlertModule {}

export default AlertModule;
