import React, { Component } from 'react'
import { SearchState, SearchProps } from '../interface/Search.interface'
import SearchUI from '../components/Search'

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      result: [],
    }
  }
  public search(): void {
    // Talk to server
  }
  render() {
    return (
      <SearchUI title={this.props.title} questions={this.props.questions} result={this.state.result}/>
    )
  }
}

export default Search
