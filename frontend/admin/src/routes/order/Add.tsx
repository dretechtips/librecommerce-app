import React from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Form from "./Form";

function Add() {
  return (
    <React.Fragment>
      <Form modifer="write"/>
      <Card title="Actions" theme="success">
        <Button value="Add" icon="fas fa-plus" color="primary" action={() => {}}/>
      </Card>
    </React.Fragment>
  )
}

export default Add
