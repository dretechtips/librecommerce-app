import React from "react";
import {
  DirectoryUIProps,
  DirectorySchemaType
} from "../interface/Directory.interface";
import Pagination from "../containers/Pagination";
import Table from "../containers/Table";
import Searchbar from "./Searchbar";

function Directory<T extends DirectorySchemaType<any>>(
  props: DirectoryUIProps<T>
) {
  return (
    <div>
      <Searchbar placeholder="Directory Lookup" search={props.filter} />
      <Table
        head={props.display[0] ? Object.keys(props.display[0]) : []}
        items={
          props.display[0] ? props.display.map(cur => Object.values(cur)) : []
        }
      />
      <Pagination size={props.paginationSize} toPage={props.toPage} />
    </div>
  );
}

export default Directory;
