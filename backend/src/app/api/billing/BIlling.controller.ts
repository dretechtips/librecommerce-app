import { Controller } from "@nestjs/common";

export const prefix = "billing";

@Controller(prefix)
export class BillingController {}

export default BillingController;
