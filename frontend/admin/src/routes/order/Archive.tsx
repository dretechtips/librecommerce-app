import React from 'react'
import Search from '../../containers/Search'
import { FormQuestion } from '../../interface/Form.interface'
import Axios, { AxiosResponse } from 'axios'

function Archive() {
  const qArchive: FormQuestion[] = [
    {question: "Date Range", input: "date-range"}
  ]
  const search = (input: any[]): Promise<AxiosResponse> => {
    return Axios.get("https://httpbin.org/get");
  }
  return (
    <Search title="Find a previous order" questions={qArchive} search={search}/>
  )
}

export default Archive
