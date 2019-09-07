export interface DatabaseQueryConstructor
{
  table: string,
  col?: column[],
  schema?: string,
  condition?: string,
  limit?: number,
  order?: [column[], "asc" | "desc"],
}

export type DatabaseKeyValue = [string, boolean | string | number | string[]];

export type column = string;