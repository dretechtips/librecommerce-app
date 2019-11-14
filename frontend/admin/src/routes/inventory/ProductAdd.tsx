import React from "react";
import Card from "../../components/Card";
import ProductForm from "./ProductForm";
import { ProductAddProps } from "../../interface/routes/Inventory.interface";

function ProductAdd(props: ProductAddProps) {
  switch (props.type) {
    case "base":
      return (
        <Card title="Add a new product" theme="success">
          <ProductForm modifer="write" type="base" />
        </Card>
      );
    case "variation":
      return (
        <Card title="Add a new product variation" theme="success">
          <ProductForm modifer="write" type="variation" />
        </Card>
      );
  }
}

export default ProductAdd;
