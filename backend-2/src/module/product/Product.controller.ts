import { Controller } from "@nestjs/common";

export const prefix = "product";

@Controller("product")
export class ProductController {
  constructor() {
    
  }
  
}

export default ProductController;