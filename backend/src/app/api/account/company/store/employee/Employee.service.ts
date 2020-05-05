import AccountServiceFactory from "src/app/api/account/Account.factory.txt";
import Service from "src/app/common/service/Service.factory";
import { AccountType } from "../../../../Type.interface";
import { EmployeeDOT, EmployeePosition } from "./Employee.interface";
import Employee from "./Employee.model";

class EmployeeService extends Service<typeof Employee> {}

export default class extends AccountServiceFactory<EmployeeDOT>(
  EmployeeService,
  Employee,
  AccountType.EMPLOYEE
) {
  public getPositions() {
    return Object.keys(EmployeePosition);
  }
}
