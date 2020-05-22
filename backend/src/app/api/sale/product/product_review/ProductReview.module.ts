import { Module } from "@nestjs/common";
import ProductReviewController from "./ProductReview.controller";
import { ProductReviewService } from "./ProductReview.service";

@Module({
  controllers: [ProductReviewController],
  providers: [ProductReviewService]
})
export class ReviewModule {
  
}

export default ReviewModule;
