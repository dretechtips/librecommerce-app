import { Money } from "../model/Money";

export class PayrollService
{
  public static CalcWage = class
  {
    public static forOneWeek(hours: number, wage: Money): Money
    {
      if(hours > 40)
      {
        return this.calcBaseAndOT(hours, wage);
      }
      else 
      {
        return this.calcBase(hours, wage);
      }
    }
    public static forOneMonth(hours: [number, number, number, number], wage: Money): Money // 28 days
    {
      let total: Money = new Money(0);
      for(let hour of hours)
      {
        const weekTotal: Money = this.forOneWeek(hour, wage);
        total = total.add(weekTotal);
      }
      return total;
    }
    private static calcBaseAndOT(hours: number, wage: Money): Money
    {
      const OTHours: number = hours - 40;
      const baseWage: Money = this.calcBase(40, wage);
      const OTWage: Money = new Money(OTHours * (wage.getValue() * 1.5));
      const totalWage: Money = baseWage.add(OTWage);
      return totalWage;
    }
    private static calcBase(hours: number, wage: Money): Money
    {
      return new Money(hours * wage.getValue());
    }
  }
  public static CalcSalary = class
  {
    
  }
  public static CalcCommission = class
  {
    
  }
}