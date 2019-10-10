export interface DropdownProps {
  icon?: string;
  name?: string;
  element?: JSX.Element;
  items: (DropdownItem | DashboardSplit)[];
}

export interface DropdownItem {
  path: string;
  icon?: string;
  name?: string;
}

export type DashboardSplit = "split";