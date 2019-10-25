import React from 'react'
import { PopoverMenuProps } from '../interface/Popover.interface'

function PopoverMenu(props: PopoverMenuProps) {
  return (
    <ul className="list-group">
      {props.items.map(cur => <li className="list-group-item px-5 py-2" onClick={() => cur.action()}><i className={cur.icon + " mr-2"}></i>{cur.name}</li>)}
    </ul>
  )
}

export default PopoverMenu
