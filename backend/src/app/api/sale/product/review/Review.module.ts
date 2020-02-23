import { Module } from "@nestjs/common";
import ReviewController from "./Review.controller";

@Module({
  controllers: [ReviewController]
})
export class ReviewModule {}

export default ReviewModule;
