import React from "react";
import { FormQuestion } from "../../interface/Form.interface";
import Form from "../../containers/Form";

function Category() {
  const questions: FormQuestion[] = [
    { question: "Name", input: "text" },
    { question: "Tags", input: "tagsbox" }
  ];
  return <Form questions={questions} modifier={props.modifier} />;
}

export default Category;
