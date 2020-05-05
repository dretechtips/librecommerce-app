import {
  IDValidationPipeFactory,
  ValidationPipeFactory
} from "src/app/common/pipe/Pipe.factory";
import EmployeeService from "./Employee.service";

export class ValidateEmployeePipe extends ValidationPipeFactory(
  EmployeeService
) {}

export class ValidateEmployeeIDPipe extends IDValidationPipeFactory(
  EmployeeService
) {}
