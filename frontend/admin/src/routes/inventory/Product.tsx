import React from "react";
import ProductSearch from "./ProductSearch";
import Card from "../../components/Card";
import { ProductProps } from "../../interface/routes/Inventory.interface";

function Product(props: ProductProps): JSX.Element {
  switch (props.type) {
    case "base":
      return (
        <Card theme="success" title="Product Lookup">
          <ProductSearch type="base" />
        </Card>
      );
    case "variation":
      return (
        <Card theme="success" title="Product Variation Lookup">
          <ProductSearch type="variation" />
        </Card>
      );
  }
}

export default Product;
