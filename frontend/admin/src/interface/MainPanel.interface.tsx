import React from "react";
import { ScreenType } from "../utils/ScreenToSize";

export interface MainPanelProps {
  routes: MainPanelRoute[];
  browser: "mobile" | "desktop";
  screen: ScreenType;
  marginTop?: number;
  marginLeft?: number;
}

export interface MainPanelRoute {
  path: string;
  component: React.ComponentType;
}
