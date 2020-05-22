import { Controller } from "@nestjs/common";
import PaymentsService from "./Payments.service";

export const prefix = "payments";

@Controller(prefix)
export class PaymentsController {
  constructor(private readonly payment: PaymentsService) {}
}

export default PaymentsController;
