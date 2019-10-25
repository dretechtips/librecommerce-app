import React, { Component } from 'react'
import { ListProps, ListState, ListModifier } from '../interface/List.interface'
import ListUI from "../components/List";

export class List extends Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);
    this.state = {
      modifier: "read",
      selected: [],
      popover: -1,
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
  togglePopover = (index: number) => {
    if(index  === this.state.popover) 
      this.setState({...this.state, popover: -1});
    else
      this.setState({...this.state, popover: index});
  }
  render() {
    return (
      <ListUI {...this.props} 
      popover={{
        toggle: this.togglePopover,
        value: this.state.popover
      }}
      modify={this.modify} 
      selected={this.state.selected} 
      selecting={this.select} 
      modifier={this.state.modifier} />
    )
  }
}

export default List
