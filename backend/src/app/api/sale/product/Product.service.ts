import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Product from "./Product.model";
import VariationService from "./variation/Variation.service.txt";
import ReviewService from "./review/Review.service";
import CategoryService from "./category/Category.service";
import { ProductWithVariationDOT } from "./Product.interface";

@Injectable()
export class ProductService extends Service<typeof Product> {
  constructor(
    private readonly variation: VariationService, 
    private readonly review: ReviewService, 
    private readonly category: CategoryService) {
      super(Product);
  }

  /**
   * 
   * @deprecated
   */
  public async getProductWithVariation(vID: string) {
    const vari = await this.variation.get(vID);
    const product = await this.get(vari.productID);
    const pwv: ProductWithVariationDOT = {
      product: product,
      variation: vari,
    }
    return pwv;
  }
}

export default ProductService;
