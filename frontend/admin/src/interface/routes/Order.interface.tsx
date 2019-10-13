import { ListItems } from "../List.interface";
import { FormModifier } from "../Form.interface";

export interface UnprocessedUIProps {
  halt: UnprocessedUIActions;
  complete: UnprocessedUIActions;
  avaliable: ListItems;
  halted: ListItems;
}

interface UnprocessedUIActions {
  (id: string): void;
}

interface UnprocessedUIBulkActions {
  (ids: string[]): void;
}

export interface UnprocessedState {
  avaliable: ListItems;
  halted: ListItems;
  details?: string;
}

export interface FormProps {
  modifer: FormModifier;
}
