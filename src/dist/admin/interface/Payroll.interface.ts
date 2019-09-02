import { Money } from "../model/Money";

interface BasePayroll
{
  firstName: string,
  lastName: string,
  paypalMe?: URL,
  bankingAccount?: string,
  online: boolean,
  payment: Money,
}

export interface WagePayroll extends BasePayroll
{
  timeframeInWeeks: number, 
}

export interface SalaryPayoll extends BasePayroll
{
  deducation: number,
}

export interface CommissionPayroll extends BasePayroll
{
  percent: number,
  total: Money,
}

export enum Absence
{
  EXCUSSED,
  UNEXCUESSED
}

