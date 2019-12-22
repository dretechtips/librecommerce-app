import React, { Component } from "react";
import { SliderProps, SliderState } from "../interface/Slider.interface";
import SliderUI from "../components/Slider";

export class Slider extends Component<SliderProps, SliderState> {
  constructor(props: SliderProps) {
    super(props);
    this.state = {
      current: this.props.current
        ? this.props.current >= this.props.min &&
          this.props.current <= this.props.max
          ? this.props.current
          : this.getDefaultValue()
        : this.getDefaultValue()
    };
  }
  private getDefaultValue(): number {
    return Math.round((this.props.min + this.props.max) / 2);
  }
  public handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, current: e.currentTarget.valueAsNumber });
    this.props.onUpdate
      ? this.props.onUpdate(e.currentTarget.valueAsNumber)
      : undefined;
  };
  render() {
    return (
      <SliderUI
        {...this.props}
        handleChange={this.handleChange}
        value={
          this.state.current + (this.props.append ? this.props.append : "")
        }
      />
    );
  }
}

export default Slider;
