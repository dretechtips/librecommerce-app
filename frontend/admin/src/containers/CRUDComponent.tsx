import React, { Component } from "react";
import { LookupbarResult } from "../interface/Lookupbar.interface";
import { AsyncForm } from "../interface/Form.interface";
import {
  CRUDComponentProps,
  CRUDComponentState
} from "../interface/CRUD.interface";
import CRUDComponentUI from "../components/CRUDComponent";
import { Redirect } from "react-router-dom";
import { MainPanelRoute } from "../interface/MainPanel.interface";
import * as StringUtil from "../utils/String";

class CRUDComponent extends Component<CRUDComponentProps, CRUDComponentState> {
  static Path(path: string): string {
    return path + "/:page";
  }
  constructor(props: CRUDComponentProps) {
    super(props);
    this.state = {
      page: this.page(this.props.page)
    };
  }
  private page(page: string | undefined) {
    if (
      page === "read" ||
      page === "create" ||
      page === "update" ||
      page === "search"
    ) {
      return page;
    } else {
      return "read";
    }
  }
  public switch(page: "read" | "create" | "update" | "search") {
    this.setState({ ...this.state, page });
  }
  public render(): JSX.Element {
    if (window.location.pathname !== this.props.path + "/" + this.state.page)
      return <Redirect to={this.props.path + "/" + this.state.page} />;
    return (
      <CRUDComponentUI
        {...this.props}
        name={StringUtil.toName(this.props.name)}
      />
    );
  }
}

export default CRUDComponent;
