export interface PaginationProps {
  size: number;
  toPage: (index: number) => void;
}

export interface PaginationUIProps extends PaginationProps {
  display: PaginationIndexer;
  toNext: () => void;
  toPrev: () => void;
  current: number;
  renderItems: () => JSX.Element[];
}

export interface PaginationState {
  display: PaginationIndexer;
  current: number;
}

interface PaginationIndexer {
  start: number;
  end: number;
}
