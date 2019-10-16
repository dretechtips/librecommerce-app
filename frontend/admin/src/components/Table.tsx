import React, { MutableRefObject, useRef } from 'react'
import { TableUIProps, TableAdd } from '../interface/Table.interface'
import Modal from './Modal'
import Button from './Button';
import Searchbar from './Searchbar';
import List from '../containers/List';

function Table(props: TableUIProps) {
  console.log("Table is being rerendered");
  return (
    <React.Fragment>
      {props.add  &&
      <Button 
      value="Add an Item" 
      icon="fas fa-plus" 
      color="primary" 
      action={() => (props.add as TableAdd).toggle()}/> }
      <table className={"table " + 
        (props.bordered ? "table-bordered " : "table-borderless ") +
        (props.small ? "table-sm " : "") +
        (props.stripped ? "table-striped" : "") +
        (props.hover ? "table-hover" : "")}>
        <thead>
          <tr>
            {props.select &&
              <td style={{textAlign: "center"}} >
                <input type="checkbox" onChange={(e) => props.select!.toggleSelectAll(e)}/>
              </td>
            }
            {props.head.map(cur => <th>{cur.toUpperCase()}</th>)}
          </tr>
        </thead>
        <tbody>
          {props.items.map((cur, index) => 
          <tr>
            {props.select &&
              <td style={{textAlign: "center"}}>
                <input 
                type="checkbox" 
                checked={props.select.values
                .find(cur => cur === index) !== undefined
                ? true 
                : false} 
                onInput={() => props.select!.toggleSelect(index)} />
                {console.log(props.select.values)}
              </td>
            }
            {cur.map(cur => <td>{cur}</td>)}
          </tr>)}
        </tbody>
      </table>
      {props.add &&
      (
        <Modal
          display={props.add.modal}
          toggle={props.add.toggle}
          title="Add To Table"
          body={(
            <React.Fragment>
              <Searchbar placeholder="Search for Items To Add" search={() => {}} />
              {/* <List items={null}/> */}
            </React.Fragment>
          )}
          footer={
            [
              <Button 
                value="Add" 
                icon="fas fa-plus"
                color="primary" 
                action={() => (props.add as TableAdd).new(["test", "test", "test"])} />,
              <Button
                value="Add & Return"
                icon="fas fa-undo"
                color="primary"
                action={() => {
                  (props.add as TableAdd).new(["test", "test", "test"]);
                  (props.add as TableAdd).toggle();
                }}
              />
            ]
        } /> 
      )}
    </React.Fragment>
  )
}

export default Table
