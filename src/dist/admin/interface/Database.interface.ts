export interface DatabaseQueryConstructor
{
  table: string,
  col?: column[],
  schema?: string,
  condition?: string,
  limit?: number,
  order?: [column[], "asc" | "desc"],
}

export type column = string;