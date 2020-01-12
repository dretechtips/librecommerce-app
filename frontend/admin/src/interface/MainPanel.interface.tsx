import React from "react";
import { ScreenType } from "../utils/ScreenToSize";
import { RouteComponentProps } from "react-router";
import { NoRequired } from "../utils/Types";

export interface MainPanelProps {
  routes: MainPanelRoute[];
  browser: "mobile" | "desktop";
  screen: ScreenType;
  marginTop?: number;
  marginLeft?: number;
}

export interface MainPanelRoute {
  path: string;
  component: React.ComponentType<
    RouteComponentProps<{ [x: string]: string | undefined }>
  >;
}
