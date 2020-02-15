import { Controller, Get, Post } from "@nestjs/common";
import { RestrictAccount } from "../../account/Account.decorator";
import PaymentsService from "./Payments.service";

export const prefix = "payment";

@Controller(prefix)
export class PaymentController {
  constructor(private readonly payment: PaymentsService) {}
}

export default PaymentController;
