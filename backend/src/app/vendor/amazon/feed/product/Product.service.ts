import { Injectable } from "@nestjs/common";
import xml from "xml";
import Product from "src/app/api/product/Product.model";
import ProductVariation from "src/app/api/product/variation/Variation.model";
import { ProductInfo, ProductDescriptionData } from "./Product.interface";
import { StandardProductIDType, ConditionType } from "../../core/base/Base.interface";
import FeedService from "../Feed.service";

@Injectable()
class ProductService {
  constructor(private readonly feed: FeedService) { }
  public add(product: Product) {
    const data: ProductInfo = {
      SKU: product.data().SKU,
      StandardProductID: {
        Type: StandardProductIDType.UPC,
        Value: product.data().UPC
      },
      ProductTaxCode: "A_GEN_TAX",
      LaunchDate: product.data().launchDate,
      ReleaseDate: product.data().releaseDate,
      Condition: {
        ConditionType: ConditionType.NEW,
        ConditionInfo: ""
      },
      ItemPackageQuantity: product.data().package,
      NumberOfItems: product.data().package * product.data().perPackage,
      DescriptionData: this.description(product),
      ProductData: {}
    }
    this.feed.addProduct([data]);
  }
  private description(product: Product): ProductDescriptionData {
    return {
      Title: product.data().name,
      Brand: product.data().brand,
      Description: product.data().description,
      ItemDimensions: "WIP",
      MSRP: -1,
      MaxOrderQuantity: -1,
      Prop65: "california regulation",
      LegalDisclaimer: product.data().warning,
      Manufacturer: "string",
      SearchTerms: "keywords",
      RecommendedBrowseNode: "not required in the US",
      UsedFor: "string",
      ItemType: "string",
      TargetAudience: "string",
      IsGiftWrapAvailable: false,
      IsGiftMessageAvailable: false,
    };
  }
  private getDimensions3D(dimensions: string) {
    return xml({
      Length: 
    })
  }
}