import { Module } from "@nestjs/common";
import InternalService from "./Internal.service";

@Module({
  controllers: [],
  providers: [InternalService]
})
export class InternalModule {

}

export default InternalModule;