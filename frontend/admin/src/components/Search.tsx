import React from "react";
import { Card } from "./Card";
import { SearchUIProps } from "../interface/Search.interface";
import { Form } from "../containers/Form";

function Search(props: SearchUIProps) {
  return (
    <div className="row">
      <div className="col-12">
        <Form
          title={props.title}
          fields={{
            questions: props.questions,
            modifier: "write"
          }}
        />
        <Card theme="success">// Search Result</Card>
      </div>
    </div>
  );
}

export default Search;
