import Mongoose from "mongoose";
import { CreditCardCompileType } from "../interface/CreditCard.interface";
import Model from "./Model";
import * as NumberUtil from "../util/NumberUtil";

const CreditCardRuntimeType: Mongoose.TypedSchemaDefinition<CreditCardCompileType> = {
  number: Number,
  cvv: Number,
  expMonth: Number,
  expYear: Number,
  provider: String
};

const CreditCardSchema = new Mongoose.Schema<CreditCardCompileType>(
  CreditCardRuntimeType
);

export class CreditCard extends Model("Credit Card", CreditCardSchema) {
  public async validate() {
    await super.validate();
    this.validateCCNumber();
    this.validateCVV();
    this.validateProvider();
    if (
      this.data().expMonth < 0 ||
      (this.data().expMonth > 11 && NumberUtil.IsFloat(this.data().expMonth))
    )
      throw new Error("Invalid Credit Card Month was passed in.");
    if (
      this.data().expYear > new Date().getFullYear() + 3 ||
      this.data().expYear < new Date().getFullYear() - 10
    )
      throw new Error("Invalid Credit Card Year was put in.");
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
      throw new Error("Credit Card Number has an invalid check sum.");
  }
  private validateCVV() {
    const cvv = this.data().cvv;
    if (cvv.toFixed().length > 5 || cvv.toFixed().length < 3)
      throw new Error("Credit Card Number has an invalid check sum.");
    if (!NumberUtil.ValidateCheckSum(cvv, 10))
      throw new Error("Credit Card CVV has an invalid check sum.");
  }
  private validateProvider() {
    const provider = this.data().provider;
    if (
      provider === "mastercard" ||
      provider === "discover" ||
      provider === "visa"
    )
      return;
    throw new Error("Credit Card Provider is invalid.");
  }
}

export default CreditCard;
