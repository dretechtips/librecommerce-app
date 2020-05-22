import { Controller, Get } from "@nestjs/common";
import ProductCategoryService from "./ProductCategory.service";

export const prefix = "product_category";


@Controller(prefix)
export class ProductCategoryController {
  
  constructor(private readonly category: ProductCategoryService) {}

}

export default ProductCategoryController;