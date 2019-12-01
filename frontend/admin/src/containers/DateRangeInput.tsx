import React from "react";
import { DateRangeInputUIProps } from "../interface/DateRangeInput.interface";

function DateRangeInput(props: DateRangeInputUIProps) {
  function onInput(
    start: React.FormEvent<HTMLInputElement> | null,
    end: React.FormEvent<HTMLInputElement> | null
  ) {
    if (props.onInput) props.onInput({ start, end });
  }
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            placeholder="Start Date"
            onInput={e => onInput(e, null)}
            value={props.start ? props.start.toString() : undefined}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            placeholder="End Date"
            onInput={e => onInput(null, e)}
            value={props.start ? props.start.toString() : undefined}
          />
        </div>
      </div>
    </div>
  );
}

export default DateRangeInput;
