import React, { Component } from 'react'
import { Actions } from "../layouts/Actions";
import { InventoryProps, InventoryState } from '../../interface/Inventory.interface';
import { Action } from "../../interface/Action.interface";
import { FormQuestion } from "../../interface/Form.interface";
import { Add } from "./Add";
import { Search } from "../layouts/Search";
import { Product } from "./Product";
import Returnbar from '../layouts/Returnbar';
import { SearchQueries } from '../../interface/SearchForm.interface';
import { SearchResultProps } from '../../interface/SearchResult.interface';

export class Inventory extends Component<InventoryProps, InventoryState> {
  private _actions: Action[] = [
    {name: "Add Product", icon: "fas fa-plus", component: this, route: "add"},
    {name: "Product Lookup", icon: "fas fa-search", component: this, route: "search"},
  ];
  private _basicQuestions: FormQuestion[] = [
    {label: "Product Name", type: "input", inputType: "text"},
    {label: "Price", type: "input", inputType: "number"},
    {label: "Category", type: "select", options: ["CATEGORY TYPE"]},
    {label: "Brand", type: "input", inputType: "text"},
    {label: "Description", type: "textarea"},
    {label: "SKU / UIC", type: "input", inputType: "text"},
    {label: "Size", type: "input", inputType: "text"},
    {label: "Color", type: "select", options: ["COLOR TYPE"]},
    {label: "Taxable", type: "checkbox"}
  ];
  private _advanceQuestions: FormQuestion[] = [
    {label: "Ingredients", type: "input", inputType: "text"},
    {label: "Directions", type: "input", inputType: "text"},
    {label: "Warning", type: "input", inputType: "text"},
    {label: "Benefits", type: "input", inputType: "text"},
    {label: "Tags", type: "textarea"}
  ]
  private _searchQueries: SearchQueries = [
    {label: "Name", type: "text"},
    {label: "SKU / UIC", type: "text"},
    {label: "Price", type: "range"},
    {label: "Brand Name", type: "text"},
    {label: "Stock", type: "number"}];
  private _searchResult: SearchResultProps = {
    header: ["Name", "Category", "Price", "Stock", "SKU/UIC"],
    data: [],
  }
  constructor(props: InventoryProps)
  {
    super(props);
    this.state = 
    {
      route: "action",
    }
  }
  render() {
    switch(this.state.route)
    {
      case "action":
        return (<React.Fragment><Actions items={this._actions} /></React.Fragment>);
      case "add":
        return (<React.Fragment><Add basicQuestion={this._basicQuestions} advanceQuestion={this._advanceQuestions} /></React.Fragment>);
      case "search":
        return (<React.Fragment><Search queryTitle={"Products Lookup"} resultTitle={"Products Result"} queries={this._searchQueries} result={this._searchResult} /></React.Fragment>)
    }
  }
}

export default Inventory
