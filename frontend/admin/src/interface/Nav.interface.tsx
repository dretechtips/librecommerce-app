export interface NavProps {
  dashboardPath: string;
  leftItems?: JSX.Element[];
  rightItems?: JSX.Element[];
  browser: "mobile" | "desktop";
}

export interface NavUIProps extends NavProps {}
