import Mongoose from "mongoose";
import { CreditCardCompileType } from "../interface/CreditCard.interface";
import Model from "../factory/Model";
import * as NumberUtil from "../util/NumberUtil";

const CreditCardRuntimeType: Mongoose.TypedSchemaDefinition<CreditCardCompileType> = {
  number: Number,
  cvv: Number,
  expMonth: Number,
  expYear: Number
};

const CreditCardSchema = new Mongoose.Schema<CreditCardCompileType>(
  CreditCardRuntimeType
);

export class CreditCard extends Model("Credit Card", CreditCardSchema) {
  public async validate() {
    await super.validate();
    this.validateCCNumber();
  }
  private validateCCNumber() {
    if (
      this.data().number.toFixed().length < 13 ||
      this.data().number.toFixed().length > 16
    )
      throw new Error(
        "Credit Card should be no smaller than 13 characters or no larger than 16 characters"
      );
    if (!NumberUtil.ValidateCheckSum(this.data().number, 10))
      throw new Error("Credit Card had an invalid check sum.");
  }
  private validateCVV() {
    const cvv = this.data().cvv;
  }
}
