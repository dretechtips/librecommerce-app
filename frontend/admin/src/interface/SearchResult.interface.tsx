export interface SearchResultProps
{
  header: string[],
  data: SearchDataRow[],
}

export interface SearchResultState
{
  
}

export interface SearchDataRow
{
  data: any[]
  hasDelete: boolean,
  hasUpdate: boolean,
}
