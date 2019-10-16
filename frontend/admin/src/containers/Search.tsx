import React, { Component } from 'react'
import { SearchState, SearchProps } from '../interface/Search.interface'
import SearchUI from '../components/Search'
import { AxiosResponse } from 'axios';

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      result: [],
    }
  }
  async search(): Promise<AxiosResponse> {
    return this.props.search(this.state.result);
  }
  render() {
    return (
      <SearchUI title={this.props.title} questions={this.props.questions} result={this.state.result} search={this.props.search}/>
    )
  }
}

export default Search
