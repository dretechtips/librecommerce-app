export interface SidePanelProps
{
  items: SidePanelItem[];
  dashboardPath: string;
}

export interface SidePanelUIProps extends SidePanelProps {
  toDashboard: (index: number, name: string, search: Function) => void;
  active: number;
  mode: SidePanelMode;
  slide: SlideProps;
}

export interface SlideProps {
  position: number;
  init: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  capture: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  end: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface SidePanelState
{
  active: number;
  mode: SidePanelMode;
  isSliding: boolean;
  position: number;
}

export interface SidePanelItem
{
  name: string,
  icon: string,
}

export type SidePanelMode = "desktop" | "mobile"