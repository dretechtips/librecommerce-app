import React, { Component } from 'react'
import { Http } from '../service/http.service'
import { SearchContainerProps, SearchState, SearchProps } from '../interface/Search.interface'
import Search from '../components/Search'

export class SearchContainer extends Component<SearchContainerProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
  }
  public search(): void {
    // Talk to server
  }
  render() {
    return (
      <Search title={this.props.title} questions={this.props.questions} url={this.props.url} config={this.props.config} method={this.props.method} result={this.state.result}/>
    )
  }
}

export default SearchContainer
