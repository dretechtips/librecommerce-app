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
}

export interface ListState {
  modifier: ListModifier;
  selected: number[];
}

export interface ListItems {
  elements: ListItem[];
  actions?: ListItemAction[];
}

interface ListItem {
  value: string;
  id: string;
}

export interface ListItemAction {
  func: (id: string) => void;
  icon: string;
  name: string;
}

export type ListModifier = "select" | "read" ;

export interface ListSelect {
  remove?: (id: string[]) => void;
}