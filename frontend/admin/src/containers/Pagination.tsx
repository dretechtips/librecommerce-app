import React, { Component } from "react";
import {
  PaginationProps,
  PaginationState
} from "../interface/Pagination.interface";
import PaginationUI from "../components/Pagination";

export class Pagination extends Component<PaginationProps, PaginationState> {
  constructor(props: PaginationProps) {
    super(props);
    this.state = {
      current: 0,
      display: {
        start: 0,
        end: this.props.size
      }
    };
  }
  public handleNext = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    e.preventDefault();
    this.setState({
      ...this.state,
      display: {
        start: this.state.display.start + this.props.size,
        end: this.state.display.end + this.props.size
      }
    });
  };
  public handlePrev = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    e.preventDefault();
    this.setState({
      ...this.state,
      display: {
        start: this.state.display.start - this.props.size,
        end: this.state.display.end - this.props.size
      }
    });
  };
  public renderItems = (): JSX.Element[] => {
    const dist: number = this.state.display.end - this.state.display.start;
    return new Array(dist).fill(null).map((cur, index) => {
      return (
        <li className="page-item">
          <a
            className="page-link"
            href="javascript:void"
            onClick={e => this.toPage(e, index + this.state.display.start)}
          >
            {index + this.state.display.start}
          </a>
        </li>
      );
    });
  };
  private toPage = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number
  ): void => {
    e.preventDefault();
    this.props.toPage(index);
    this.setState({ ...this.state, current: index });
  };
  render() {
    return (
      <PaginationUI
        {...this.props}
        toNext={this.handleNext}
        toPrev={this.handlePrev}
        display={this.state.display}
        current={this.state.current}
        renderItems={this.renderItems}
      />
    );
  }
}

export default Pagination;
