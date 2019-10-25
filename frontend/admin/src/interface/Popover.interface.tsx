import { RefHandler, PopperChildrenProps } from "react-popper";

export interface PopoverProps {
  header?: string;
  body: JSX.Element[] | JSX.Element;
  popper: PopperChildrenProps;
}

export interface PopoverMenuItem {
  icon: string;
  name: string;
  action: () => void;
}

export interface PopoverMenuProps {
  items: PopoverMenuItem[];
}