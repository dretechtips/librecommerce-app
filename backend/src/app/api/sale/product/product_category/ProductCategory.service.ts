import { Injectable } from "@nestjs/common";
import { ProductDOT } from "../Product.interface";
import Product from "../Product.model";
import { CategoryDOT } from "./ProductCategory.interface";
import ProductCategory from "./ProductCategory.model";
import { InjectModel } from "src/app/common/model/Model.decorator";
import Service from "src/app/common/service/Service.factory";

@Injectable()
export class ProductCategoryService extends Service<ProductCategory> {

  constructor(
    @InjectModel(ProductCategory) public readonly model: ProductCategory,
  ) {
    super();
  }

  public findByProduct(product: Product | string): Category[] {
    if(typeof product === "string") {

    }
    return null;
  }
}

export default ProductCategoryService;
