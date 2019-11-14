import React from "react";
import Lookupbar from "../../containers/Lookupbar";
import {
  ProductVariation,
  ProductSearchProps,
  Product
} from "../../interface/routes/Inventory.interface";
import { LookupbarResult } from "../../interface/Lookupbar.interface";
import { product, variation } from "./TestUnit";

function ProductSearch(props: ProductSearchProps) {
  async function Search(): Promise<Product[]> {
    return [product, product, product, product, product];
  }
  async function SearchVariation(): Promise<ProductVariation[]> {
    return [variation, variation, variation, variation];
  }
  function ToResult(value: Product): LookupbarResult {
    return {
      id: value.id,
      title: value.name,
      description: value.description,
      image: value.imagesURL[0]
    };
  }
  function ToResultVariation(value: ProductVariation): LookupbarResult {
    return {
      id: value.id,
      title: value.name,
      description: "$" + value.price,
      image: value.imagesURL[0]
    };
  }
  return (
    <div>
      {props.type === "base" && (
        <Lookupbar<Product>
          add="/inventory/product/add/"
          search={Search}
          toResult={ToResult}
        />
      )}
      {props.type === "variation" && (
        <Lookupbar<ProductVariation>
          add="/inventory/product-variation/add/"
          search={SearchVariation}
          toResult={ToResultVariation}
        />
      )}
    </div>
  );
}

export default ProductSearch;
