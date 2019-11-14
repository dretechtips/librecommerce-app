import React from "react";
import { SearchbarProps } from "../interface/Searchbar.interface";

export function Searchbar(props: SearchbarProps): JSX.Element {
  const ref: React.RefObject<HTMLInputElement> = React.createRef();
  function getValue(): string {
    const el: HTMLInputElement | null = ref.current;
    if (el) return el.value;
    else return "";
  }
  function keypress(e: React.KeyboardEvent): void {
    e.preventDefault();
    props.search(getValue());
  }
  return (
    <div className="row mb-3">
      <div className="col-12">
        <div className="input-group">
          <input
            type="text"
            value={props.value}
            className="form-control"
            placeholder={props.placeholder}
            ref={ref}
            onKeyUp={e => keypress(e)}
          />
          {!props.buttons && (
            <div className="input-group-append">
              <button
                className="input-group-text"
                onClick={() => props.search(getValue())}
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          )}
          {props.buttons && (
            <div className="input-group-append">
              {props.buttons.map(button => (
                <button
                  className="input-group-text"
                  onClick={() => button.action()}
                >
                  <i className={button.icon}></i>
                  {button.text && <span className="ml-2">{button.text}</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
