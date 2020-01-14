import React from "react";
import CRUDComponent from "../../containers/CRUDComponent";
import { RouteComponentProps } from "react-router";

function Product(props: RouteComponentProps<{ page?: string | undefined }>) {
  return (
    <CRUDComponent
      {...props}
      serverName={"inventory/product"}
      clientName={"inventory product"}
    />
  );
}
export default Product;
