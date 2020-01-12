import React, { Component } from "react";
import { LookupbarResult } from "../interface/Lookupbar.interface";
import { AsyncForm } from "../interface/Form.interface";
import {
  CRUDComponentProps,
  CRUDComponentState,
  CRUDQuestionsType
} from "../interface/CRUD.interface";
import CRUDComponentUI from "../components/CRUDComponent";
import { Redirect } from "react-router-dom";
import { MainPanelRoute } from "../interface/MainPanel.interface";
import * as StringUtil from "../utils/String";
import { AxiosResponse } from "axios";
import HTTP from "../service/http.service";
import { AnyMap } from "../utils/Types";

class CRUDComponent extends Component<CRUDComponentProps, CRUDComponentState> {
  public static readonly Path = function(path: string): string {
    return path + "/:page";
  };
  constructor(props: CRUDComponentProps) {
    super(props);
    this.state = {
      page: this.page(this.props.match.params.page)
    };
  }
  private getQuestions = async (
    type: CRUDQuestionsType
  ): Promise<AxiosResponse> => {
    const req = new HTTP(this.props.serverName + "/questions");
    const res = await req.get({
      params: { [this.props.serverName]: { type } }
    });
    return res;
  };
  private fetch = async (id: string): Promise<AxiosResponse> => {
    const req = new HTTP(this.props.serverName + "/get");
    const res = await req.get({ params: { [this.props.serverName]: { id } } });
    return res;
  };
  private new = async (value: AnyMap): Promise<AxiosResponse> => {
    const req = new HTTP(this.props.serverName + "/create");
    const res = await req.post({
      data: { [this.props.serverName]: { value } }
    });
    return res;
  };
  private delete = async (id: string): Promise<AxiosResponse> => {
    const req = new HTTP(this.props.serverName + "/delete");
    const res = await req.delete({
      data: { [this.props.serverName]: { id } }
    });
    return res;
  };
  private update = async (value: AnyMap): Promise<AxiosResponse> => {
    const req = new HTTP(this.props.serverName + "/update");
    const res = await req.patch({
      data: { [this.props.serverName]: { value } }
    });
    return res;
  };
  private query = async (query: AnyMap): Promise<AxiosResponse> => {
    const req = new HTTP(this.props.serverName + "/search");
    const res = await req.get({
      params: { [this.props.serverName]: { query } }
    });
    return res;
  };
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
    return (
      <CRUDComponentUI
        {...this.props}
        clientName={StringUtil.toName(this.props.clientName)}
        getQuestions={this.getQuestions}
        fetch={this.fetch}
        new={this.new}
        delete={this.delete}
        update={this.update}
        query={this.query}
      />
    );
  }
}

export default CRUDComponent;
