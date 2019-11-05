import {} from '../interface/Payroll.interface';
import { PayrollService } from '../service/Payroll.service';
import { Request, Response, NextFunction } from 'express';
import { HttpMethod, HttpFunction } from '../decorator/Http.decorator';
import Schedule from '../model/Schedule';
import User from '../model/User';
import { DatabaseError, ServerError } from '../type/Error';
import {
  Wage,
  Salary,
  Commission,
  Payroll,
  PayrollManager
} from '../model/Payroll';

const list = HttpFunction(
  'System was unable to list the payrolls.',
  (req, res) => {
    const payrolls: Payroll[] = Payroll.search({ active: true });
    if (payrolls)
      res.send({
        success: true,
        payrolls: payrolls.map(cur => cur.toPrimObj())
      });
    else res.send({ success: true, payrolls: [] });
  }
);

const pay = HttpFunction(
  'System was unable to pay the payrolls',
  async (req, res, next) => {
    const userIDs: string[] = req.body.payroll.userIDs;
    const payrolls: Payroll[] = Payroll.search({ active: true });
    if (payrolls) {
      const fPayrolls = payrolls.filter(cur =>
        userIDs.find(id => id === cur.getUserID()) ? true : false
      );
      const failures: Payroll[] = [];
      for (let i = 0; i < fPayrolls.length; i++) {
        const payroll: Payroll = fPayrolls[i];
        const result: boolean = payroll.pay();
        if (!result) failures.push(payroll);
      }
      if (failures.length > 0) {
        const names: string = failures
          .map(cur => cur.getUser().getName())
          .join(', ');
        if (failures.length === 1)
          throw new ServerError(
            'The payroll for employee ' +
              names +
              ' was a failure. Please notify this employee.',
            true
          );
        else
          throw new ServerError(
            'The payroll for employees' +
              names +
              'were failures. Please notify these employees.',
            true
          );
      }
    } else return next();
  }
);
