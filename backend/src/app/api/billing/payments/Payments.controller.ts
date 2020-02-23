import { Controller } from "@nestjs/common";
import PaymentsService from "./Payments.service";

export const prefix = "payment";

@Controller(prefix)
export class PaymentController {
  constructor(private readonly payment: PaymentsService) {}
}

export default PaymentController;
