export interface DirectoryProps<Schema extends DirectorySchemaType<any>> {
  search: (start: number, end: number, value: string) => Promise<Schema[]>;
}

export interface DirectoryUIProps<Schema extends DirectorySchemaType<any>>
  extends DirectoryProps<any> {
  filter: (value: string) => Promise<void>;
  page: number;
  display: Schema[];
  pageSize: number;
  paginationSize: number;
  toPage: (page: number) => void;
}

export interface DirectoryState<Schema extends DirectorySchemaType<any>> {
  page: number;
  display: Schema[];
  lookup: string;
}

export type DirectorySchemaType<T> = {
  [K in keyof T]: string | number | boolean;
};
