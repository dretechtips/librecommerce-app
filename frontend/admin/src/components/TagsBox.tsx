import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { TagsBoxUIProps } from "../interface/Tagsbox.interface";

function TagsBox(props: TagsBoxUIProps) {
  return (
    <ReactTags
      handleDelete={props.handleDelete}
      handleDrag={props.handleDrag}
      handleAddition={props.handleAdd}
    />
  );
}

export default TagsBox;
