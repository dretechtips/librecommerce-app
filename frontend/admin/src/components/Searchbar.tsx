import React from "react";
import { SearchbarProps } from "../interface/Searchbar.interface";

export function Searchbar(props: SearchbarProps): JSX.Element {
  const ref: React.RefObject<HTMLInputElement> = React.createRef();
  function getValue(): string {
    const el: HTMLInputElement | null = ref.current;
    if(el)
      return el.value;
    else 
      return "";
  }
  function keypress(e: React.KeyboardEvent): void {
    console.log(getValue());
    props.search(getValue());
  }
  return(
    <div className="row mb-3">
      <div className="col-12">
        <div className="input-group">
          <input type="text" className="form-control" placeholder={props.placeholder} ref={ref} onKeyUp={(e) => keypress(e)}/>
          <div className="input-group-append">
            <button className="input-group-text" onClick={() => props.search(getValue())}>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}