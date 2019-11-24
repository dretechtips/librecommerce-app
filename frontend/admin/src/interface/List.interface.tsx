export interface ListProps {
  items: ListItems;
  add?: () => void;
  select?: ListSelect;
}

export interface ListUIProps extends ListProps {
  modifier: ListModifier;
  modify: (modifer: ListModifier) => void;
  selecting: (index: number) => void;
  selected: number[];
  popover: ListPopover;
}

export interface ListPopover {
  toggle: (index: number) => void;
  value: number;
}

export interface ListState {
  modifier: ListModifier;
  selected: number[];
  popover: number;
}

export interface ListItems {
  elements: ListItem[];
  actions?: ListItemAction[];
}

export interface ListItem {
  value: string;
  id: string;
}

export interface ListItemAction {
  func: (id: string) => void;
  icon: string;
  name: string;
}

export type ListModifier = "select" | "read";

export interface ListSelect {
  remove?: (id: string[]) => void;
}
