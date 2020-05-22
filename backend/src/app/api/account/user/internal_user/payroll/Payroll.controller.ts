import { Controller } from "@nestjs/common";
import PayrollService from "./Payroll.service";

@Controller("payroll")
export class PayrollController {
  constructor( private readonly payroll: PayrollService ) {}
}

export default PayrollController;
