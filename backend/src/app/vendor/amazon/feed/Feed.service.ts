import { Injectable } from "@nestjs/common";
import Product from "../../../api/product/Product.model";
import { Variation as ProductVariation } from "src/app/api/product/variation/Variation.model";
import Order from "../../../api/order/Order.model";
import { AmazonService } from "../Amazon.service";
import { FeedType, FeedAction } from "./Feed.interface";
import { ProductInfo } from "./product/Product.interface";
import xml = require("xml");

@Injectable()
export class FeedService {
  private version = "2009-01-01";
  constructor(private readonly amazon: AmazonService) {}
  private useFeed() {
    return this.amazon.useMWS().feeds;
  }
  private useFeedSubmit(content: string, type: FeedType) {
    return this.useFeed().submit(
      {
        Version: this.version,
        Action: FeedAction.SUBMIT,
        SellerId: "sellerid",
        MWSAuthToken: "token",
        FeedType: type,
        FeedContent: content
      },
      (err, data) => {
        if (err) {
          console.log(err);
          throw new Error("Unable to submit a feed to Amazon API.");
        }
        console.log(data);
      }
    );
  }
  public addProduct(data: ProductInfo[]) {
    if (data.length === 0)
      throw new Error("Cannot add an empty product to Amazon.");
    // 1. Add Product In
    // 2. Add Product Relationship
    // 3. Add Product Image
    // Catch: If this fails the it needs to throw an error and clean up everything
  }
  public getOrder() {}
}

export default FeedService;
