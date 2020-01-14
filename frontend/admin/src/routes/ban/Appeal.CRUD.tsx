import React from "react";
import CRUDComponent from "../../containers/CRUDComponent";
import { RouteComponentProps } from "react-router";

function Appeal(props: RouteComponentProps<{ page?: string | undefined }>) {
  return (
    <CRUDComponent
      {...props}
      serverName={"ban/appeal"}
      clientName={"ban appeal"}
    />
  );
}
export default Appeal;
