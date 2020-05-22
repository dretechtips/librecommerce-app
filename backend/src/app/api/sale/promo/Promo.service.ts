import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Promo from "./Promo.model";
import CostSchema from "../../billing/cost/Cost.schema";
import Product from "../product/Product.model";
import { ProductDOT } from "../product/Product.interface";

@Injectable()
export class PromoService extends Service<typeof Promo> {
  constructor() {
    super(Promo);
  }

  /**
   * Redeems a promotion by giving the costs that will apply on the transaction
   */
  public async apply(
    code: string,
    products: Product[]
  ): Promise<CostSchema[]> {
    const promo = await this.get(code);
    return products
      .filter(product => promo.hasDiscount(product._id, product.categoryIDs))
      .map(
        product =>
          new CostSchema(
            `Promo[${promo.code}] on ${product.name}`,
            -1 * promo.getTrueDiscount(product.cost.value)
          )
      );
  }
}

export default PromoService;
