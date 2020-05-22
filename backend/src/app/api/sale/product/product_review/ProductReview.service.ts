import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import ProductReview from "./ProductReview.model";
import { InjectModel, InjectModelByProp } from "src/app/common/model/Model.decorator";

@Injectable()
export class ProductReviewService extends Service<ProductReview> { 

  constructor(@InjectModel(ProductReview) public readonly model: ProductReview) {
    super();
  }

}

export default ProductReviewService;