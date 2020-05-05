import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import { Review } from "./Review.model";

@Injectable()
export class ReviewService extends Service<typeof Review> {
  
}

export default ReviewService;