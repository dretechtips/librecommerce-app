import React from 'react';
import { Card } from "./Card";
import { SearchUIProps } from "../interface/Search.interface";
import { Form } from '../containers/Form';

function Search(props: SearchUIProps) {
  return (
    <div className="row">
      <div className="col-12">
        <Card className="mb-4" title={props.title + " Query"} theme="success">
          <Form questions={props.questions} modifier="write"/>
        </Card>
        <Card title={props.title + " Result"} theme="success">
          // Search Result
        </Card>
      </div>
    </div>
  )
}

export default Search
