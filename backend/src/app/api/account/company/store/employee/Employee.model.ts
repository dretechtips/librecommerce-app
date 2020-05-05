import { AccountSchema, Account } from "src/app/api/account/Account.model";
import ModelFactory, { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import { prop } from "@typegoose/typegoose";
import { EmployeeDOT, EmployeePosition } from "./Employee.interface";

class EmployeeSchema extends AccountSchema  implements EmployeeDOT {
  @prop({ required: true })
  scheduleID: string;
  @prop({ required: true, enum: EmployeePosition })
  position: EmployeePosition;
  @prop({ required: true })
  lastPayed: Date;
  @prop({ required: true })
  payrollID: string;
}

export class Employee extends ExtendedModelFactory(Account, EmployeeSchema) {}

export default Employee;
