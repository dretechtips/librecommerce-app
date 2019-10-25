import React from 'react';
import { ProductFormProps } from "../../interface/routes/Inventory.interface";
import { FormQuestion } from '../../interface/Form.interface';
import Form from '../../containers/Form';

function ProductForm(props: ProductFormProps): JSX.Element {
  const qBase: FormQuestion[] = [
    {question: "Name", input: "text"},
    {question: "Description", input: "textarea"},
    {question: "Brand", input: "text"},
    {question: "SKU (Stock Keeping Unit)", input: "barcode"},
    {question: "UPC (Universal Product Code)", input: "barcode"}
  ];
  const qVariate: FormQuestion[] = [
    {question: "Name", input: "text"},
    {question: "Base Product ID", input: "text"},
    {question: "Price", input: "text"},
    {question: "Images", input: "photo"},
    {question: "Stock Quantity", input: "text"},
    {question: "Size", input: "text"},
    {question: "Color", input: "text"}
  ]
  switch(props.type) {
    case "base":
      return <Form questions={qBase} modifier={props.modifer}/>;
    case "variation":
      return <Form questions={qVariate} modifier={props.modifer}/>;
  }
}

export default ProductForm
