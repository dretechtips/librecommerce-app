import React from "react";

export default (props: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>): JSX.Element => {
  const ref = React.createRef<HTMLTextAreaElement>();
  const focus = () => {
    let count: number = 0;
    if(ref.current) {
      Array.from(ref.current.value).forEach(cur => {
        if(cur === "\n") {
          count++;
        }
      });
      ref.current.value += (count + 1) + ". ";
    }
  }
  const keyup = (e: React.KeyboardEvent) => {
    let count: number = 0;
    if(e.key === "Enter") {
      if(ref.current) {
        Array.from(ref.current.value).forEach(cur => {
          if(cur === "\n") {
            count++;
          }
        });
        ref.current.value += (count + 1) + ". ";
      }
    }
  }
  return <textarea {...props} onKeyUp={(e) => keyup(e)} onFocus={e => focus()} ref={ref} />
}