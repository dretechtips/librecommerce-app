import React, { Component } from 'react'
import Table from "../../containers/Table";
import Button from '../../components/Button';

export function ProductTable() {
  return (
    <Table 
    head={["quantity", "name", "variation", "id", ""]} 
    items={[["1", "Demo Item", "Blue", "437282740", <Button size="sm" value="Details" icon="fas fa-ellipsis-v fa-fw" color="primary" action={() => {}}   />]]}
    stripped
    bordered={false}
    small
    allowAdd
    allowSelect 
    allowDelete />
  )
}

export default ProductTable
