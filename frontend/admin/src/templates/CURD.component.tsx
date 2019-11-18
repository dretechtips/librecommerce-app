import React, { Component } from "react";
import { FormRelation } from "../interface/Form.interface";
import {
  ICRUD,
  Selection,
  CRUDPath,
  CRUDProps
} from "../interface/CRUD.interface";
import { LookupbarResult } from "../interface/Lookupbar.interface";
import {
  CreatePage,
  ReadPage,
  UpdateDeletePage,
  SearchPage
} from "./CURD.pages";

abstract class CURDComponent<
  T extends {},
  K extends Omit<T, any>,
  P = {},
  S = {}
> extends Component<CRUDProps & P, S> implements ICRUD<T, K> {
  constructor(props: P & CRUDProps) {
    super(props);
  }
  abstract name: string;
  public questions(): FormRelation<T> {
    return ({
      ...this.cQuestions,
      ...this.sQuestions
    } as unknown) as FormRelation<T>;
  }
  abstract cQuestions: FormRelation<K>;
  abstract sQuestions: FormRelation<Omit<T, keyof K>>;
  abstract new: (value: K) => Promise<void>;
  abstract update: (value: K) => Promise<void>;
  abstract delete: (id: string) => Promise<void>;
  abstract fetch: (id: string) => Promise<T>;
  abstract toResult: (value: T) => LookupbarResult;
  abstract query: (value: string) => Promise<T[]>;
  render() {
    const name = this.name
      .split("")
      .map((char, index) => {
        if (index === 0) return char.toUpperCase();
        else return char.toLowerCase();
      })
      .join("");
    switch (this.props.selection as Selection) {
      case "read":
        return (
          <ReadPage<T>
            title={`${name} Details`}
            questions={this.questions()}
            getter={this.fetch}
          />
        );
      case "create":
        return (
          <CreatePage<K>
            questions={this.cQuestions}
            submit={this.new}
            title={`Add a new ${name}`}
          />
        );
      case "search":
        return (
          <SearchPage<T>
            add={this.props.paths.create}
            title={`Lookup ${name}`}
            submit={this.query}
            toResult={this.toResult}
          />
        );
      case "update&delete":
        return (
          <UpdateDeletePage<T, K>
            title={`Modify or Delete ${name}`}
            submit={this.update}
            getter={this.fetch}
            questions={this.questions()}
          />
        );
    }
  }
}

export default CURDComponent;
