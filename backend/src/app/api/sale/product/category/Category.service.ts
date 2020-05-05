import { Injectable } from "@nestjs/common";
import { ProductDOT } from "../Product.interface";
import Product from "../Product.model";
import { CategoryDOT } from "./Category.interface";
import { Category } from "./Category.model";

@Injectable()
export class CategoryService {
  public findByProduct(product: Product): Category[] {
    // TODO
  }

  public findByProductID(productID: string): Category[] {
    // TODO
  }
}

export default CategoryService;
