import React from "react";
import {
  CRUDPagesProps,
  CreateProps,
  ReadProps,
  UpdateDeleteProps,
  SearchProps,
  FormProps,
  Selection
} from "../interface/CRUD.interface";
import Card from "../components/Card";
import Lookupbar from "../containers/Lookupbar";
import Form from "../containers/Form";
import { FormRelation } from "../interface/Form.interface";

export function CreatePage<T>(props: CreateProps<T> & FormProps) {
  return (
    <Card title={props.title} theme="success">
      <Form questions={props.questions} modifier={"write"} />
    </Card>
  );
}

export function ReadPage<T>(props: ReadProps<T> & FormProps) {
  return (
    <Card title={props.title} theme="success">
      <Form questions={props.questions} modifier={"read"} />
    </Card>
  );
}

export function UpdateDeletePage<T, K extends Omit<T, any>>(
  props: UpdateDeleteProps<T, K> & FormProps
) {
  return (
    <Card title={props.title} theme="success">
      <Form questions={props.questions} modifier={"write"} />
    </Card>
  );
}

export function SearchPage<T>(props: SearchProps<T>) {
  return (
    <Card title={props.title} theme="success">
      <Lookupbar<T>
        add={props.add}
        search={props.submit}
        toResult={props.toResult}
      />
    </Card>
  );
}
