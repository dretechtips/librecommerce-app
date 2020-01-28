import { Controller, Post } from "@nestjs/common";

@Controller("review")
export class ReviewController {
  @Post("create")
  public create() {
    
  }
}

export default ReviewController;