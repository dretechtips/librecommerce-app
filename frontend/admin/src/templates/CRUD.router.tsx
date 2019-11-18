import React from "react";
import CURDComponent from "./CURD.component";
import { Selection, CRUDPath } from "../interface/CRUD.interface";
import { MainPanelRoute } from "../interface/MainPanel.interface";

function CRUDWithRouter<T>(
  WrappedComponent: React.ComponentType<
    T & { selection: Selection; paths: CRUDPath }
  >,
  props: T,
  paths: CRUDPath
): (selection: Selection) => MainPanelRoute {
  return (selection: Selection) => {
    switch (selection) {
      case "create":
        return {
          path: paths.create,
          component: () => (
            <WrappedComponent {...props} selection={selection} paths={paths} />
          )
        };
      case "read":
        return {
          path: paths.read,
          component: () => (
            <WrappedComponent {...props} selection={selection} paths={paths} />
          )
        };
      case "search":
        return {
          path: paths.search,
          component: () => (
            <WrappedComponent {...props} selection={selection} paths={paths} />
          )
        };
      case "update&delete":
        return {
          path: paths.modify,
          component: () => (
            <WrappedComponent {...props} selection={selection} paths={paths} />
          )
        };
    }
  };
}

export default CRUDWithRouter;
