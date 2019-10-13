export interface SidePanelProps
{
  items: SidePanelItem[];
  dashboardPath: string;
}

export interface SidePanelUIProps extends SidePanelProps {
  toDashboard: (index: number, name: string, search: Function) => void;
  active: number;
}

export interface SidePanelState
{
  active: number;
}

export interface SidePanelItem
{
  name: string,
  icon: string,
}
