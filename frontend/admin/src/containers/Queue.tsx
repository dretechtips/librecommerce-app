import React, { Component } from "react";
import {
  QueueProps,
  QueueState,
  QueueProcess
} from "../interface/Queue.interface";
import { Redirect } from "react-router";
import QueueUI from "../components/Queue";
import { ListItemAction } from "../interface/List.interface";

export class Queue extends Component<QueueProps, QueueState> {
  constructor(props: QueueProps) {
    super(props);
    this.state = {
      avaliable: [],
      halted: [],
      toDetails: null
    };
  }
  public componentDidMount(): void {
    this.fetch();
  }
  public details = (id: string): void => {
    this.setState({ ...this.state, toDetails: id });
  };
  public fetch = async (): Promise<void> => {
    try {
      const avaliable: QueueProcess[] = await this.props.getAvaliable();
      const halted: QueueProcess[] = await this.props.getHalted();
      this.setState({ ...this.state, avaliable, halted });
    } catch (e) {
      return;
    }
  };
  public complete = async (id: string): Promise<void> => {
    try {
      await this.props.complete(id);
      this.setState({
        ...this.state,
        avaliable: this.state.avaliable.filter(cur => cur.id !== id)
      });
    } catch (e) {
      return;
    }
  };
  public halt = async (id: string): Promise<void> => {
    try {
      await this.props.halt(id);
      this.setState({
        ...this.state,
        avaliable: this.state.avaliable.filter(cur => cur.id !== id),
        halted: this.state.halted.concat(
          ...this.state.avaliable.filter(cur => cur.id === id)
        )
      });
    } catch (e) {
      return;
    }
  };
  private aHalted: ListItemAction[] = [
    { func: this.details, icon: "fas fa-info-circle", name: "Details" },
    { func: this.halt, icon: "fas fa-hand-paper", name: "Halt" },
    { func: this.complete, icon: "fas fa-check", name: "Complete" }
  ];
  private aAvaliable: ListItemAction[] = [
    { func: this.details, icon: "fas fa-info-circle", name: "Details" },
    { func: this.complete, icon: "fas fa-check", name: "Complete" }
  ];
  render() {
    if (this.state.toDetails !== null) {
      return <Redirect to={this.props.details + this.state.toDetails} />;
    } else {
      return (
        <QueueUI
          {...this.props}
          halted={{ process: this.state.halted, actions: this.aHalted }}
          avaliable={{
            process: this.state.avaliable,
            actions: this.aAvaliable
          }}
        />
      );
    }
  }
}

export default Queue;
