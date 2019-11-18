import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { TagsBoxUIProps } from "../interface/Tagsbox.interface";

function TagsBox(props: TagsBoxUIProps) {
  return (
    <ReactTags
      classNames={{
        selected: "form-row",
        tagInputField: "form-control",
        tagInput: "col-12 col-sm-6 col-md-4",
        tag: "btn btn-outline-success mr-2 mb-2",
        remove: "ml-2"
      }}
      tags={props.tags}
      handleDelete={props.handleDelete}
      handleDrag={props.handleDrag}
      handleAddition={props.handleAdd}
    />
  );
}

export default TagsBox;
