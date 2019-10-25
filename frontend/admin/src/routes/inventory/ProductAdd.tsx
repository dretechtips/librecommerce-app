import React from 'react'
import Card from '../../components/Card'
import ProductForm from './ProductForm'

function ProductAdd() {
  return (
    <Card title="Add a new product" theme="success">
      <ProductForm modifer="write" type="variation" />
    </Card>
  )
}

export default ProductAdd
