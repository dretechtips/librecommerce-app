import { Controller, Get } from "@nestjs/common";

@Controller("category")
export class CategoryController {
  @Get("create")
  public create() {
    
  }
}

export default CategoryController;