import React from "react";
import List from "../containers/List";
import Searchbar from "./Searchbar";
import { PreloadedSearchUIProps } from "../interface/PreloadedSearch.interface";

function PreloadedSearch<T>(props: PreloadedSearchUIProps<T>) {
  return (
    <div>
      <Searchbar placeholder={props.placeholder} search={props.select} />
      <List
        items={{ elements: props.filtered.map(cur => props.convert(cur)) }}
      />
    </div>
  );
}

export default PreloadedSearch;
