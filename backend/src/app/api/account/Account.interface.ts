import { AlertDependentDOT } from "../alert/Alert.interface";
import { PaymentsDependentDOT } from "../billing/transaction/payments/Payments.interface";
import { SubscriptionDependentDOT } from "../sale/subscription/Subscription.interface";
import { prop } from "@typegoose/typegoose";
import { DisableableDOT } from "src/app/common/disableable/Disableable.interface";
import { ProductReviewDependentDOT } from "../sale/product/product_review/ProductReview.interface";

export interface AccountDOT extends AlertDependentDOT, PaymentsDependentDOT, SubscriptionDependentDOT, DisableableDOT, ProductReviewDependentDOT {
  /**
   * Last date an order was created
   * @default 1/1/1970
   */
  lastOrderDate: Date;
  /**
   * Browsers fingerprints
   */
  fingerprints: string[];
}

export interface AccountLoginDOT {
  username: string;
  password: string;
}

/**
 * Implement this in account base schemas that require a login to enter
 */
export abstract class AccountLoginSchema implements AccountLoginDOT {
  @prop({required: true})
  public username: string;
  @prop({required: true})
  public password: string;
}

/**
 * 2 - 3 Letter Code
 */
export enum AccountType {
  /**
   * Non-profit single customer
   */
  CUSTOMER = "CS",
  /**
   * Profit company
   */
  CUSTOMER_COMPANY = "CSC",
  /**
   * Profit company store
   */
  CUSTOMER_STORE = "CSS",
  /**
   * Profit company employees
   */
  CUSTOMER_EMPLOYEE = "CSE",
  /**
   * This company
   */
  COMPANY = "CO",
  /**
   * This company stores
   */
  STORE = "ST",
  /**
   * This company employee
   */
  EMPLOYEE = "EM",
  /**
   * Shadow Account
   */
  NONE = "NO"
}
