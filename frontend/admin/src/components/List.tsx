import React from 'react';
import { ListUIProps } from "../interface/List.interface";
import Button from './Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle as fasCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as farCheckCircle } from "@fortawesome/free-regular-svg-icons";

function List(props: ListUIProps) {
  switch(props.modifier) {
    case "read":
      return (
        <div>
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between mb-2">
                {props.add 
                ? (<Button icon="fas fa-plus" value="Add" color="primary" action={props.add}/>)
                : ""}
                {props.select 
                ? (<Button icon="fas fa-check-circle" value="Select" color="primary" action={() => props.modify("select")}/>)
                : ""}
              </div>
            </div>
          </div>
          <ul className="list-group">
            {props.items.elements.map(cur => (
              <li className="list-group-item" key={cur.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {cur.value}
                  </div>
                  <div>
                    {props.items.actions 
                    ? (props.items.actions.map(x => (<Button className="ml-2" size="sm" color="primary" value={x.name} icon={x.icon} action={() => x.func(cur.id)}/>)))
                    : ""}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    case "select":
      return (
        <div>
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between mb-2">
                <div>
                  {props.select 
                  ? (props.select.remove 
                    ? <Button className="mr-2" icon="fas fa-minus" value="Delete" color="primary" action={props.select.remove}/>
                    : "")
                : ""}
                </div>
                <Button value="Cancel" icon="fas fa-backspace" action={() => props.modify("read")} color="primary"/>
              </div>
            </div>
          </div>
          <ul className="list-group">
            {props.items.elements.map((cur, index) => (
              <li className="list-group-item" key={cur.id} onClick={() => props.selecting(index)}>
                <div className="d-flex justify-content-between">
                  <div>
                    {cur.value}
                  </div>
                  <div>
                    {props.selected.find(cur => cur === index) !== undefined ? (<FontAwesomeIcon icon={fasCheckCircle} />) : (<FontAwesomeIcon icon={farCheckCircle} />)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
  }
}

export default List
