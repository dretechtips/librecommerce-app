import React from 'react'
import Search from '../../containers/Search'
import { FormQuestion } from '../../interface/Form.interface'

function Archive() {
  const qArchive: FormQuestion[] = [
    {question: "Date Range", input: "date-range"}
  ]
  return (
    <Search title="Archived Orders" questions={qArchive}/>
  )
}

export default Archive
