import { Controller, Get } from "@nestjs/common";

@Controller("order")
export class OrderController {
  @Get("list")
  public async getList() {}
}

export default OrderController;
