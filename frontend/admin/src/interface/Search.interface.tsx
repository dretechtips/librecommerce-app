import { SearchQueries } from "./SearchForm.interface";
import { SearchResultProps } from "./SearchResult.interface";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpMethod } from "../service/http.service";
import FormField from "../components/FormField";
import { FormRelation } from "./Form.interface";

export interface SearchProps {
  title: string;
  questions: FormRelation<any>;
  search: (inputs: { [x: string]: any }) => Promise<AxiosResponse>;
}

export interface SearchUIProps extends SearchProps {
  result: string | number | boolean[][];
}

export interface SearchState {
  result: any[];
}
