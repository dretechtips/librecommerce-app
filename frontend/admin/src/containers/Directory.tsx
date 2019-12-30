import React, { Component } from "react";
import DirectoryUIProps from "../components/Directory";
import {
  DirectoryProps,
  DirectoryState,
  DirectorySchemaType
} from "../interface/Directory.interface";
import { getScreenType } from "../utils/ScreenToSize";

export class Directory<
  T extends { [K in keyof T]: string | number | boolean }
> extends Component<DirectoryProps<T>, DirectoryState<T>> {
  constructor(props: DirectoryProps<T>) {
    super(props);
    this.state = {
      page: 0,
      display: [],
      lookup: ""
    };
  }
  public getPageSize(): number {
    switch (getScreenType()) {
      case "xs":
        return 10;
      case "sm":
        return 15;
      case "md":
        return 20;
      case "lg":
        return 25;
      case "xl":
        return 30;
      default:
        return 25;
    }
  }
  public getPaginationSize(): number {
    switch (getScreenType()) {
      case "xs":
        return 3;
      case "sm":
        return 4;
      case "md":
        return 5;
      case "lg":
        return 6;
      case "xl":
        return 7;
      default:
        return 6;
    }
  }
  public async componentDidMount() {
    try {
      const rows: T[] = await this.props.search(
        0,
        this.getPageSize(),
        this.state.lookup
      );
      this.setState({ ...this.state, display: rows });
    } catch (e) {
      alert("Directory was unable to search for items.");
    }
  }
  public toPage = async (page: number): Promise<void> => {
    try {
      const rows: T[] = await this.props.search(
        page * this.getPageSize(),
        (page + 1) * this.getPageSize(),
        this.state.lookup
      );
      this.setState({ ...this.state, page, display: rows });
      return;
    } catch (e) {
      alert("Directory was unable to search for items.");
    }
  };
  public filter = async (value: string) => {
    try {
      const page: number = this.state.page;
      const rows: T[] = await this.props.search(
        page * this.getPageSize(),
        (page + 1) * this.getPageSize(),
        value
      );
      this.setState({ ...this.state, display: rows });
    } catch (e) {
      alert("Directory was unable to search for items.");
    }
  };
  render() {
    return (
      <DirectoryUIProps
        {...this.props}
        toPage={this.toPage}
        page={this.state.page}
        display={this.state.display}
        pageSize={this.getPageSize()}
        paginationSize={this.getPaginationSize()}
        filter={this.filter}
      />
    );
  }
}

export default Directory;
