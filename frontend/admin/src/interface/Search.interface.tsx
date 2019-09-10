import SearchForm from "../components/layouts/SearchForm";
import { SearchQueries } from "./SearchForm.interface";
import { SearchResultProps } from "./SearchResult.interface";

export interface SearchProps
{
  queries: SearchQueries,
  result: SearchResultProps,
  queryTitle: string,
  resultTitle: string,
}

export interface SearchState
{
  
}