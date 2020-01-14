import React from "react";
import CRUDComponent from "../../containers/CRUDComponent";
import { RouteComponentProps } from "react-router";

function Category(props: RouteComponentProps<{ page?: string | undefined }>) {
  return (
    <CRUDComponent
      {...props}
      serverName={"inventory/category"}
      clientName={"inventory category"}
    />
  );
}
export default Category;
