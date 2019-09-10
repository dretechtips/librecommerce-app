import React, { Component } from 'react'
import { SearchResultProps, SearchResultState } from '../../interface/SearchResult.interface'

export class SearchResult extends Component<SearchResultProps, SearchResultState> {
  constructor(props: SearchResultProps)
  {
    super(props);
  }
  render() {
    return (
      <table className="table table-bordered table-striped">
        <thead>
          {this.props.header.map(cur => (<th>{cur}</th>))}
        </thead>
        <tbody>
          {this.props.data.map(cur => (<tr>{cur.data.map(cur => (<td>{cur}</td>))}</tr>))}
        </tbody>
      </table>
    )
  }
}

export default SearchResult
