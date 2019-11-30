import React from "react";
import Form from "./Form";
import FormUI from "../../containers/Form";
import Card from "../../components/Card";
import { FormQuestion } from "../../interface/Form.interface";
import { useParams } from "react-router";

function Details() {
  const { id } = useParams();
  const qOrder: FormQuestion[] = [
    { question: "Order ID", input: "text" },
    { question: "Status", input: "text" }
  ];
  return (
    <React.Fragment>
      <Card title="Order Details" theme="success">
        <FormUI modifier="read" questions={qOrder} />
      </Card>
      <Form modifer="read" />
    </React.Fragment>
  );
}

export default Details;
