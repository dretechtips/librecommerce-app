import { NewBody } from "../interface/Product.interface";
import { HttpFunction } from "../decorator/HttpMethod";
import { inventory } from "../controller/Inventory.controller";
import Product from "../model/Product";

export const add = HttpFunction("POST", "The system was unable to add the product to the inventory.", (req, res) => {
  const bProduct: NewBody = req.body.product;
  const product: Product = Product.generate(bProduct);
  product.save();
  inventory.add(product);
});

export const remove = HttpFunction("DELETE", "The system was unable to delete the product to the inventory.", (req, res) => {
  
});

export const update = HttpFunction("PATCH", "The system was unable to update the product to the inventory.")