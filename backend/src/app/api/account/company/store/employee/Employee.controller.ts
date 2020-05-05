import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { RestrictAccess } from "src/app/api/account/util/login/Login.decorator";
import { AccountType } from "../../../../Type.interface";
import { EmployeeDOT } from "./Employee.interface";
import { ValidateEmployeeIDPipe, ValidateEmployeePipe } from "./Employee.pipe";
import EmployeeService from "./Employee.service";

export const prefix = "employee";

@Controller(prefix)
@RestrictAccess(AccountType.STORE)
export class EmployeeController {
  constructor(private readonly employee: EmployeeService) {}
  @Post("create")
  public async create(
    @Body(prefix, ValidateEmployeePipe) employee: EmployeeDOT
  ) {
    return (await this.employee.create(employee))._id;
  }
  @Get("fetch/:id")
  public async find(@Param("id", ValidateEmployeeIDPipe) id: string) {
    return (await this.employee.get(id))._id;
  }
  @Patch("update")
  public async update(
    @Param("id", ValidateEmployeeIDPipe) id: string,
    @Body(prefix, ValidateEmployeePipe) dot: EmployeeDOT
  ) {
    await this.employee.update(id, dot);
  }
  @Get("get/positions")
  public getPositions() {
    return this.employee.getPositions();
  }
}

export default EmployeeController;
