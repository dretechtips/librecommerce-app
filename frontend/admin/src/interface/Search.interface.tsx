import { SearchQueries } from "./SearchForm.interface";
import { SearchResultProps } from "./SearchResult.interface";
import { FormQuestion } from "./Form.interface";
import { AxiosRequestConfig } from "axios";
import { HttpMethod } from "../service/http.service";

export interface SearchContainerProps
{
  title: string;
  questions: FormQuestion[];
  url: string;
  config: AxiosRequestConfig;
  method: HttpMethod;
}

export interface SearchProps extends SearchContainerProps {
  result: string | number | boolean[][];
}

export interface SearchState
{
  result: any[];
}