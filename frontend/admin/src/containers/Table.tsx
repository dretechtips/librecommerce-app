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
      select: false,
    }
  }
  addItems = (items: TableItem[]): void => {
    this.state.items.push(items);
    this.setState({...this.state});
  }
  toggleAddModal = (): void => {
    this.setState({...this.state, add: !this.state.add});
  }
  toggleCheckboxAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(this.state.items);
    if(!e.target.checked)
      this.setState({...this.state, selected: []});
    else
      this.setState({...this.state, 
        selected: new Array(this.state.items.length)
        .fill(0)
        .map((cur, index) => index)});
  }
  toggleCheckbox = (index: number): void => {
    if(this.state.selected.indexOf(index) > -1) {
      this.state.selected.splice(this.state.selected.indexOf(index), 1);
      this.setState({...this.state});
    }
    else
      this.state.selected.push(index);
      this.setState({...this.state});
  }
  toggleSelect = (): void => {
    this.setState({...this.state, select: !this.state.select});
    return;
  }
  delete = (): void => {
    for(let i = 0 ; i < this.state.selected.length; i++) {
      const itemPos: number = this.state.selected[i];
      this.state.selected.splice(i, 1);
      this.state.items.splice(itemPos, 1);
    }
    this.setState({...this.state});
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
        {canSelect: this.state.select,
        toggleCheckbox: this.toggleCheckbox,
        values: this.state.selected,
        toggleCheckboxAll: this.toggleCheckboxAll,
        toggleSelect: this.toggleSelect} :
        undefined}
      delete={this.state.select && this.props.allowDelete 
        ? {execute: this.delete} 
        : undefined} />
  }
}

export default Table
