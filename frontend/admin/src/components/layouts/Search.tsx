import React, { Component } from 'react'
import { SearchProps, SearchState } from '../../interface/Search.interface'
import { SearchForm } from "../layouts/SearchForm"
import { SearchResult } from "../layouts/SearchResult"
import { Card } from "../layouts/Card"

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps)
  {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <Card className="mb-4" title={this.props.queryTitle} theme="danger">
            <SearchForm input={this.props.queries} />
          </Card>
          <Card title={this.props.resultTitle} theme="success">
            <SearchResult header={this.props.result.header} data={this.props.result.data}/>
          </Card>
        </div>
      </div>
    )
  }
}

export default Search
