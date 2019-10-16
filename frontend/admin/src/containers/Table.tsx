import React, { Component, MutableRefObject } from 'react';
import TableUI from "../components/Table";
import { TableState, TableProps, TableItem } from '../interface/Table.interface';
import Modal from '../components/Modal';
import { Searchbar } from '../components/Searchbar';
import List from '../containers/List';
import Button from '../components/Button';

export class Table extends Component<TableProps, TableState> {
  constructor(props: TableProps){
    super(props);
    this.state = {
      items: this.props.items,
      add: false,
      selected: new Array<number>(),
    }
  }
  addItems = (items: TableItem[]) => {
    this.state.items.push(items);
    this.setState({...this.state});
  }
  toggleAddModal = () => {
    this.setState({...this.state, add: !this.state.add});
  }
  toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(this.state.items);
    if(!e.target.checked)
      this.setState({...this.state, selected: []});
    else
      this.setState({...this.state, 
        selected: new Array(this.state.items.length)
        .fill(0)
        .map((cur, index) => index)});
  }
  toggleSelect = (index: number) => {
    if(this.state.selected.indexOf(index) > -1) {
      this.state.selected.splice(this.state.selected.indexOf(index), 1);
      this.setState({...this.state});
    }
    else
      this.state.selected.push(index);
      this.setState({...this.state});
    console.log(this.state.selected);
  }
  render() {
    return <TableUI {...this.props} 
      items={this.state.items}
      add={this.props.allowAdd ?
        {new: this.addItems,
        modal: this.state.add,
        button: this.props.allowAdd,
        toggle: this.toggleAddModal} :
        undefined}
      select={this.props.allowSelect ?
        {toggleSelect: this.toggleSelect,
        values: this.state.selected,
        toggleSelectAll: this.toggleSelectAll} :
        undefined} />
  }
}

export default Table
