export interface DashboardProps {
  icons: DashboardIcons[];
  basePath: string;
  title: string;
}

export interface DashboardPropsManager {
  actions: DashboardProps[];
}

export interface DashboardIcons {
  name: string;
  icon: string;
  path: string;
}

export interface DashboardState {
  display: DashboardProps[];
}