export interface SearchbarProps {
  placeholder: string;
  search: SearchFunction;
  value?: string;
}

export interface SearchFunction {
  (value: string): void;
}