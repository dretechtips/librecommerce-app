import React from 'react'
import Card from '../../components/Card'
import FormUI from "../../containers/Form";
import { FormQuestion } from '../../interface/Form.interface';
import { FormProps } from '../../interface/routes/Order.interface';
import ProductTable from '../inventory/ProductTable';

function Form(props: FormProps) {
  const qCustomer: FormQuestion[] = [
    {question: "Account Username", input: "text"},
    {question: "Account Password", input: "text"},
    {question: "Caller First Name", input: "text"},
    {question: "Caller Last Name", input: "text"},
  ]
  const qShipping: FormQuestion[] = [
    {question: "Address", input: "text"},
    {question: "Shipping Provider", input: "select", options: ["USPS", "UPS", "FEDEX"]}
  ]
  const qPayment: FormQuestion[] = [
    {question: "Credit Card Provider", input: "select", options: ["MasterCard", "Visa", "Discover"]},
    {question: "Credit Card Number", input: "text"},
    {question: "Credit Card Exp. Month", input: "text"},
    {question: "Credit Card Exp. Year", input: "text"},
    {question: "Credit Card CVV", input: "text"}
  ]
  return (
    <React.Fragment>
      <Card title="Customer Details" theme="success">
        <FormUI questions={qCustomer} modifier={props.modifer} />
      </Card>
      <Card title="Product Details" theme="success">
        <ProductTable />
      </Card>
      <Card title="Shipping Details" theme="success">
        <FormUI questions={qShipping} modifier={props.modifer}/>
      </Card>
      <Card title="Payment Details" theme="success">
        <FormUI questions={qPayment} modifier={props.modifer}/>
      </Card>
    </React.Fragment>
  )
}

export default Form
