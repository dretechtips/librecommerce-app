import React from "react";
import { CRUDComponentUIProps } from "../interface/CRUD.interface";
import { Create, Read, Update, Search } from "../pages/CRUD.pages";

function CRUDComponent(props: CRUDComponentUIProps): JSX.Element {
  switch (props.page) {
    case "create":
      return <Create {...props} title={props.name} submit={props.new} />;
    case "read":
      return <Read {...props} title={props.name} get={props.fetch} />;
    case "search":
      return <Search {...props} title={props.name} submit={props.result} />;
    case "update":
      return (
        <Update
          {...props}
          title={props.name}
          submit={props.update}
          get={props.fetch}
        />
      );
    default:
      return <div></div>;
  }
}

export default CRUDComponent;
