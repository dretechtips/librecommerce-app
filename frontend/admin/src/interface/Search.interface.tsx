import { SearchQueries } from "./SearchForm.interface";
import { SearchResultProps } from "./SearchResult.interface";
import { FormQuestion } from "./Form.interface";
import { AxiosRequestConfig } from "axios";
import { HttpMethod } from "../service/http.service";

export interface SearchProps
{
  title: string;
  questions: FormQuestion[];
}

export interface SearchUIProps extends SearchProps {
  result: string | number | boolean[][];
}

export interface SearchState
{
  result: any[];
}