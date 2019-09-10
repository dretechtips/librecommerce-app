import React, { Component } from 'react'
import { Action } from '../../interface/Action.interface';
import { FormQuestion } from '../../interface/Form.interface';

export class Order extends Component {
  private _action: Action[] = [
    {name: "Create Order", icon: "fas fa-plus", component: this, route: "add"},
    {name: "Today Order", icon: "fas fa-calander-check", component: this, route: "today"},
    {name: "Order Lookup", icon: "fas fa-search", component: this, route: "search"},
    {name: "Hold List", icon: "fas fa-pause", component: this, route: "hold"},
  ]
  private _questions: FormQuestion[] = [
    
  ];
  constructor(props: any)
  {
    super(props);
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Order
