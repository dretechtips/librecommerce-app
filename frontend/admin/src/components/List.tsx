import React from 'react';
import { ListUIProps } from "../interface/List.interface";
import Button from './Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle as fasCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as farCheckCircle } from "@fortawesome/free-regular-svg-icons";
import {Manager, Reference, Popper} from "react-popper";
import Popover from './Popover';
import { PopoverMenuItem } from '../interface/Popover.interface';
import PopoverMenu from './PopoverMenu';

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
            {props.items.elements.map((cur, index) => (
              <Manager>
                <Reference>
                  {({ref}) => <li 
                    className="list-group-item" 
                    key={cur.id} 
                    ref={ref}
                    onClick={e => props.popover.toggle(index)}
                    onTouchStart={e => props.popover.toggle(index)}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        {cur.value}
                      </div>
                      <div>
                        
                      </div>
                    </div>
                  </li>}
                </Reference>
                {props.items.actions && (props.popover.value === index) &&
                <Popper placement="bottom">
                  {popper => (
                    <Popover popper={popper} body={
                      <PopoverMenu items={
                        props.items.actions!.map(el => {
                          const props: PopoverMenuItem = {
                            name: el.name,
                            icon: el.icon,
                            action: () => el.func(cur.id)
                          }
                          return props;
                        })
                      } />
                    }/>
                  )}
                </Popper>}
              </Manager>
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
