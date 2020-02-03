import { Module } from "@nestjs/common";
import AlertController from "./Alert.controller";

@Module({
  controllers: [AlertController]
})
export class AlertModule {}

export default AlertModule;
