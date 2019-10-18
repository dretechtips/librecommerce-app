import React, { MutableRefObject, useRef } from 'react'
import { TableUIProps, TableAdd } from '../interface/Table.interface'
import Modal from './Modal'
import Button from './Button';
import Searchbar from './Searchbar';
import List from '../containers/List';

function Table(props: TableUIProps) {
  return (
    <React.Fragment>
      {( props.add  || props.select ) &&
      <div className="row mb-2">
        <div className="col d-flex justify-content-between">
          {props.add &&
            <Button 
              value="Add an Item" 
              icon="fas fa-plus" 
              color="primary" 
              action={() => props.add!.toggle()}
              size="sm"/>
          }
          <div>
            {props.delete &&
              <Button
                className="ml-2" 
                value={"Delete Items"}
                icon={"fas fa-trash"}
                color="primary"
                action={() => props.delete!.execute()}
                size="sm"
                />}
            {props.select &&
              <Button 
                className="ml-2"
                value={!props.select.canSelect ? "Select Items" : "Cancel Selection"}
                icon="fas fa-check"
                color="primary"
                action={() => props.select!.toggleSelect()}
                size="sm" />
            }
          </div>
        </div>
      </div>}
      <table className={"table " + 
        (props.bordered ? "table-bordered " : "table-borderless ") +
        (props.small ? "table-sm " : "") +
        (props.stripped ? "table-striped" : "") +
        (props.hover ? "table-hover" : "")}>
        <thead>
          <tr>
            {props.select && props.select.canSelect &&
              <td style={{textAlign: "center"}} >
                <input
                checked={props.select!.values.length === props.items.length}
                type="checkbox" 
                onChange={(e) => props.select!.toggleCheckboxAll(e)}/>
              </td>
            }
            {props.head.map(cur => <th>{cur.toUpperCase()}</th>)}
          </tr>
        </thead>
        <tbody>
          {props.items.map((cur, index) => 
          <tr>
            {props.select && props.select.canSelect &&
              <td style={{textAlign: "center"}}>
                <input 
                type="checkbox" 
                checked={props.select.values
                .find(cur => cur === index) !== undefined
                ? true 
                : false} 
                onInput={() => props.select!.toggleCheckbox(index)} />
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
                action={() => (props.add as TableAdd).new(["test", "test", "test"])}
                size="sm" />,
              <Button
                value="Add & Return"
                icon="fas fa-undo"
                color="primary"
                action={() => {
                  (props.add as TableAdd).new(["test", "test", "test"]);
                  (props.add as TableAdd).toggle();
                  }
                }
                size="sm"
              />
            ]
        } /> 
      )}
    </React.Fragment>
  )
}

export default Table
