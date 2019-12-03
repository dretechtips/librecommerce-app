import React from "react";
import { FileUploadUIProps } from "../interface/FileUpload.interface";

function FileUpload(props: FileUploadUIProps) {
  return (
    <div
      {...props.input}
      className={"custom-file " + (props.interface ? "d-none" : "")}
    >
      <input
        className="custom-file-input"
        type="file"
        onChange={props.syncFiles}
        ref={props.interface ? props.interface.set : undefined}
      />
      <label className="custom-file-label">{props.message}</label>
    </div>
  );
}

export default FileUpload;
