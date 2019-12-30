import { ScreenType } from "../../utils/ScreenToSize";

export interface AppProps {}

export interface AppState {
  navHeight: number;
  sidePanelWidth: number;
  screen: ScreenType;
}
