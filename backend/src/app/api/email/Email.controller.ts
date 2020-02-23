import { Controller } from "@nestjs/common";

export const prefix = "email";

@Controller(prefix)
export class EmailController {}

export default EmailController;
