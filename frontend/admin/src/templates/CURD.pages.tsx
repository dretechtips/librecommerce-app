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

export function CreatePage<T>(props: CreateProps<T> & FormProps) {
  return (
    <Form
      fields={{
        questions: props.questions,
        modifier: "write"
      }}
      title={props.title}
    />
  );
}

export function ReadPage<T>(props: ReadProps<T> & FormProps) {
  return (
    <Form
      fields={{
        questions: props.questions,
        modifier: "read"
      }}
      title={props.title}
    />
  );
}

export function UpdateDeletePage<T, K extends Omit<T, any>>(
  props: UpdateDeleteProps<T, K> & FormProps
) {
  return (
    <Form
      fields={{
        questions: props.questions,
        modifier: "write"
      }}
      title={props.title}
    />
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
