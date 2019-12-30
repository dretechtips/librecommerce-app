import { ScreenType } from "../utils/ScreenToSize";

export interface SidePanelProps {
  items: SidePanelItem[];
  dashboardPath: string;
  top?: number;
  screen: ScreenType;
}

export interface SidePanelUIProps extends SidePanelProps {
  toDashboard: (index: number, name: string, search: Function) => void;
  active: number;
  slide: SlideProps;
  open: boolean;
  toggle: () => void;
}

export interface SidePanelState {
  active: number;
  isSliding: boolean;
  position: number;
  open: boolean;
}

export interface SidePanelContext {
  isOpen(): boolean;
  toggle(): void;
}

export interface SlideProps {
  position: number;
  init: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  capture: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  end: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface SidePanelItem {
  name: string;
  icon: string;
}
