import React, { Component } from 'react'
import { MainProps, MainState } from "../interface/Main.interface";
import { Billing } from "./billing/Billing";
import { Cart } from "./cart/Cart";
import { Coupon } from "./coupon/Coupon";
import { Customer } from "./customer/Customer";
import { Inventory } from "./inventory/Inventory";
import { Order } from "./order/Order";
import { Promo } from "./promotion/Promo";
import { Spy } from "./spy/Spy";
import { Dashboard } from "./dashboard/Dashboard";
import { User } from "./user/User";
import { Shipping } from "./shipping/Shipping";
import Actions from './layouts/Actions';

export class Main extends Component<MainProps, MainState> {
  constructor(props: MainProps)
  {
    super(props);
    this.state = {route: props.route}
  }
  render() {
    switch(this.props.route) {
      case "dashboard":
        return (<React.Fragment><Dashboard /></React.Fragment>);
      case "billing":
        return (<React.Fragment><Billing /></React.Fragment>);
      case "cart":
        return (<React.Fragment><Cart /></React.Fragment>);
      case "coupon":
        return (<React.Fragment><Coupon /></React.Fragment>);
      case "customer":
        return (<React.Fragment><Customer /></React.Fragment>);
      case "inventory":
        return (<React.Fragment><Inventory /></React.Fragment>);
      case "order":
        return (<React.Fragment><Order /></React.Fragment>);
      case "promo":
        return (<React.Fragment><Promo /></React.Fragment>); 
      case "spy":
        return (<React.Fragment><Spy /></React.Fragment>); 
      case "user":
        return (<React.Fragment><User /></React.Fragment>);
      case "shipping":
        return (<React.Fragment><Shipping /></React.Fragment>)
    }
  }
}

export default Main
