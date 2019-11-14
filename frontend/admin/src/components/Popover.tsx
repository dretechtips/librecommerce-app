import React from "react";
import { PopoverProps } from "../interface/Popover.interface";

function Popover(props: PopoverProps) {
  return (
    <div
      className={"popover fade show bs-popover-" + props.popper.placement}
      style={{ ...props.popper.style, maxWidth: "80%" }}
      ref={props.popper.ref}
    >
      <div
        className="arrow"
        ref={props.popper.arrowProps.ref}
        style={props.popper.arrowProps.style}
      />
      {props.header && <h3 className="popup-header">{props.header}</h3>}
      <div className="popover-body">{props.body}</div>
    </div>
  );
}

export default Popover;
