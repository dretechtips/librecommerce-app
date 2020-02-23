import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Product from "./Product.model";

@Injectable()
export class ProductService extends Service<typeof Product> {}

export default ProductService;
