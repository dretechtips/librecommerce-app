import React from "react";
import { SliderUIProps } from "../interface/Slider.interface";

function Slider(props: SliderUIProps) {
  return (
    <div>
      <input
        type="range"
        min={props.min}
        max={props.max}
        onInput={props.handleChange}
      />
      <input
        type="text"
        className="form-control"
        readOnly
        value={props.value}
      />
    </div>
  );
}

export default Slider;
