import { Controller, Post } from "@nestjs/common";
import { SaleService } from "./Sale.service";

@Controller("sale")
class SaleController {
  constructor(private readonly sale: SaleService) {}
  @Post("create")
  public create() {
    
  }
}

export default SaleController;
