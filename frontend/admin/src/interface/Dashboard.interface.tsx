export interface DashboardProps {
  icons: DashboardIcons[];
  basePath: string;
  title: string;
}

export interface DashboardPropsManager {
  actions: DashboardProps[];
  search?: string;
}

export interface DashboardIcons {
  name: string;
  icon: string;
  path: string;
}

export interface DashboardState {
  display: DashboardProps[];
  search: string;
}

export interface DashboardSearch {
  (value: string): void;
}