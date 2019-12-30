export type ScreenType = "xs" | "sm" | "md" | "lg" | "xl";

export function getScreenType(): ScreenType {
  const width: number = window.innerWidth;
  switch (true) {
    case width >= 1200:
      return "xl";
    case width >= 992:
      return "lg";
    case width >= 768:
      return "md";
    case width >= 576:
      return "sm";
    case width < 576:
      return "xs";
    default:
      return "lg";
  }
}

export default getScreenType;
