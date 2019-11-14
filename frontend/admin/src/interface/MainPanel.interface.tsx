import React from "react";

export interface MainPanelProps {
  routes: MainPanelRoute[];
}

export interface MainPanelRoute {
  path: string;
  component: React.ComponentType;
}
