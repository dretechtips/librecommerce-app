export interface SearchbarProps {
  placeholder: string;
  search: SearchFunction;
}

export interface SearchFunction {
  (value: string): void;
}