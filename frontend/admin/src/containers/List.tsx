import React, { Component } from 'react'
import { ListProps, ListState, ListModifier } from '../interface/List.interface'
import ListUI from "../components/List";

export class List extends Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);
    this.state = {
      modifier: "read",
      selected: [],
    }
  }
  modify = (modifier: ListModifier) => {
    this.setState({...this.state, modifier});
  }
  select = (index: number) => {
    if(this.state.selected.find(x => x == index) !== undefined) {
      const filter = this.state.selected.filter(x => x !== index);
      this.setState({...this.state, selected: filter});
    }
    else {
      this.state.selected.push(index);
      this.setState({...this.state});
    }
  }
  add() {

  }
  render() {
    return (
      <ListUI {...this.props} 
      modify={this.modify} 
      selected={this.state.selected} 
      selecting={this.select} 
      modifier={this.state.modifier} />
    )
  }
}

export default List
