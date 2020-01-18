import { PayrollCompileType } from "../interface/Payroll.interface";
import Mongoose from "mongoose";
import Model from "../factory/Model";

const PayrollRuntimeType: Mongoose.TypedSchemaDefinition<PayrollCompileType> = {
  userID: String,
  active: String,
  wage: {
    hourlyRate: Number
  },
  salary: {
    base: Number,
    bonuses: [Number]
  },
  commission: {
    percent: Number
  }
};

const PayrollSchema = new Mongoose.Schema<PayrollCompileType>(
  PayrollRuntimeType
);

class Payroll extends Model("Payroll", PayrollSchema) {
  public calcPayment() {
    // Get User
    // Get User Schedule
    // Using the Schedule calculate the total payroll
  }
  public async validate() {
    await super.validate();
    // Call on User API to validate
    if (this.data().wage.hourlyRate < 7.25)
      throw new Error("US Federal Min Limits is $7.25");
    if (this.data().wage.hourlyRate > 100)
      throw new Error("The wage is capped at a $100");
    if (this.data().salary.base > 500000)
      throw new Error("No salary should be over $500,000");
    if (
      this.data().commission.percent > 100 ||
      this.data().commission.percent < 0
    )
      throw new Error(
        "No percentage is bellow 0 percent or above 100 percent."
      );
  }
}

export default Payroll;
