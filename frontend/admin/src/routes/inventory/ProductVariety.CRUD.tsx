import React from "react";
import CRUDComponent from "../../containers/CRUDComponent";
import { RouteComponentProps } from "react-router";

function ProductVariety(
  props: RouteComponentProps<{ page?: string | undefined }>
) {
  return (
    <CRUDComponent
      {...props}
      serverName={"inventory/product/variety"}
      clientName={"inventory product variety"}
    />
  );
}
export default ProductVariety;
