import { IPayroll } from "../interface/Payroll.interface";
import { PayrollService } from "../service/Payroll.service";
import { Request, Response, NextFunction } from "express";
import { HttpMethod } from "../decorator/HttpMethod";
import { Schedule, ScheduleManager } from "../model/Schedule";
import { UserManager, User } from "../model/User";
import { DatabaseError, ServerError } from "../model/Error";
import { Wage, Salary, Commission, Payroll, PayrollManager } from "../model/Payroll";

export class PayrollController {
  @HttpMethod("GET", "System was unable to list the payrolls.")
  public static list(req: Request, res: Response): void {
    const payrolls: Payroll[] | null = PayrollManager.from.active();
    if (payrolls)
      res.send({ success: true, payrolls: payrolls.map(cur => cur.toPrimObj()) });
    else
      res.send({ success: true, payrolls: [] });
  }
  @HttpMethod("POST", "System was unable to pay the payrolls")
  public static async pay(req: Request, res: Response): Promise<void> {
    const userIDs: string[] = req.body.payroll.userIDs;
    const payrolls: Payroll[] | null = PayrollManager.from.active();
    if (payrolls) {
      const fPayrolls = payrolls.filter(cur => userIDs.find(id => id === cur.getUserID()) ? true : false);
      const failures: Payroll[] = [];
      for (let i = 0; i < fPayrolls.length; i++) {
        const payroll: Payroll = fPayrolls[i];
        const result: boolean = payroll.pay();
        if (!result)
          failures.push(payroll);
      }
      if (failures.length > 0) {
        const users: User[] = await Promise.all(failures.map(cur => UserManager.from.id(cur.getUserID())) as User[]);
        const names: string = users.map(cur => cur.getName()).join(', ');
        if (failures.length === 1)
          throw new ServerError("The payroll for employee " +
            names +
            " was a failure. Please notify this employee.", true);
        else
          throw new ServerError("The payroll for employees" +
            names +
            "were failures. Please notify these employees.", true);
      }
    }
    else
      res.send({ success: true });
  }
}