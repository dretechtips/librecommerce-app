import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import EmployeeController from "./Employee.controller";
import EmployeeService from "./Employee.service";

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}

export default EmployeeModule;
