import { Controller, Post } from "@nestjs/common";
import { ProductReviewService } from "./ProductReview.service";

export const prefix = "product_review";

@Controller(prefix)
export class ProductReviewController {

  constructor(private readonly reivew: ProductReviewService) {}
  
}


export default ProductReviewController;