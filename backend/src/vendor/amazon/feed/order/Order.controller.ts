import { Controller, Get } from "@nestjs/common";

@Controller("order")
export class OrderService {
  @Get("list/incompleted")
  public async getIncompleteList() {}
}
