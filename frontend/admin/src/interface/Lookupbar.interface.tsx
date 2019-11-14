export interface LookupbarProps<T> {
  add: string;
  search: (value: string) => Promise<T[]>;
  toResult: (value: T) => LookupbarResult;
}

export interface LookupbarUIProps<T> extends LookupbarProps<T> {
  result: LookupbarResult[];
  processor: (value: string) => void;
  unhighlight: () => void;
  highlight: (index: number) => void;
  highlighted: number;
}

export interface LookupbarState {
  result: LookupbarResult[];
  hovered: number;
}

export interface LookupbarResult {
  title: string;
  description: string;
  image?: string;
  id: string;
}
