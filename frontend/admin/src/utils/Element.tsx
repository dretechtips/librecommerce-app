import React, { MutableRefObject } from "react";

export function scrollToTop(ref: MutableRefObject<HTMLElement>): void {
  const wrapper: Element | null = ref.current.offsetParent;
  if (wrapper) wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
  else ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
}
