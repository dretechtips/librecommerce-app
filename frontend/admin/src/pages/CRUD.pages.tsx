import React from "react";
import Form from "../containers/Form";
import {
  ReadPageProps,
  CreatePageProps,
  SearchPageProps,
  UpdatePageProps
} from "../interface/CRUD.interface";
import Card from "../components/Card";
import Lookupbar from "../containers/Lookupbar";

export async function Read(props: ReadPageProps): JSX.Element {
  return (
    <Form
      title={props.title}
      fields={{
        modifier: "read",
        questions: {}
      }}
    />
  );
}

export function Update(props: UpdatePageProps): JSX.Element {
  return (
    <Form
      title={props.title}
      fields={{
        modifier: "write",
        questions: {}
      }}
    />
  );
}

export function Search(props: SearchPageProps): JSX.Element {
  return (
    <Card title={props.title} theme={"success"}>
      Search Is Work In Progress
    </Card>
  );
}

export function Create(props: CreatePageProps): JSX.Element {
  return (
    <Form
      title={props.title}
      fields={{
        modifier: "read",
        questions: {}
      }}
    />
  );
}
