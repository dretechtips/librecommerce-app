import React, { Component } from "react";
import {
  PreloadedSearchProps,
  PreloadedSearchState
} from "../interface/PreloadedSearch.interface";
import PreloadedSearchUI from "../components/PreloadedSearch";
import { ListItem } from "../interface/List.interface";

export class PreloadedSearch<T> extends Component<
  PreloadedSearchProps<T>,
  PreloadedSearchState<T>
> {
  constructor(props: PreloadedSearchProps<T>) {
    super(props);
    this.state = {
      filtered: this.props.items,
      selectedID: null
    };
  }
  public select = (id: string) => {
    this.setState({ ...this.state, selectedID: id });
  };
  public filter = (value: string) => {
    const filtered: T[] = this.state.filtered.filter((cur, index) => {
      const item: ListItem = this.props.convert(cur);
      return item.value.indexOf(value) !== -1;
    });
    this.setState({ ...this.state, filtered });
  };
  render() {
    return (
      <PreloadedSearchUI<T>
        {...this.props}
        filtered={this.state.filtered}
        selectedID={this.state.selectedID}
        filter={this.filter}
        select={this.select}
      />
    );
  }
}

export default PreloadedSearch;
