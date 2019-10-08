import React, { Component, ReactNode } from 'react';
import "./css/App.css";
import { AppState, AppProps } from "../interface/App.interface";
import { Nav } from "../components/Nav";
import { SidePanel } from "../containers/SidePanel";
import { SidePanelItem } from '../interface/SidePanel.interface';
import { MainPanel } from "../containers/MainPanel";
import { Login } from "../routes/user/Login";

export class App extends Component<AppProps, AppState> {
  private sidebar: SidePanelItem[] = [
    {name: "Dashboard", icon: "fas fa-tachometer-alt"},
    {name: "Ban", icon: "fas fa-hammer"},
    {name: "Billing", icon: "fas fa-money-check"},
    {name: "Cart", icon: "fas fa-shopping-cart"}
    {name: "Customer", icon: "fas fa-shopping-bag"},
    {name: "Inventory", icon: "fas fa-warehouse"},
    {name: "Order", icon: "fas fa-receipt"},
    {name: "Payroll", icon: "fas fa-redo"},
    {name: "Promotion", icon: "fas fa-ad"},
    {name: "Shipping", icon: "fas fa-truck"},
    {name: "Speech Filter", icon: "fas fa-filter"},
    {name: "Subscription", icon: "fas fa-hand-pointer"},
    {name: "Spy", icon: "fas fa-user-secret"},
    {name: "User", icon: "fas fa-user"},];
  constructor(props: any)
  {
    super(props);
    this.state = {
      hasLogin: false
    }
  }
  public login = (): void =>
  {
    this.setState({...this.state, hasLogin: true});
  }
  render() {
    if(this.state.hasLogin)
    {
      return(
        <div className="App">
          <Nav 
          logoURL="https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Medicine_Hat_Tigers_Logo.svg/1200px-Medicine_Hat_Tigers_Logo.svg.png"
          adminURL="https://via.placeholder.com/40x40"
          adminName="John Doe"/>
          <div className="row no-gutters App-Content">
            <SidePanel items={this.sidebar}/>
            <MainPanel />
          </div>
        </div>
      );
    }
    else
    {
      return (<Login login={this.login}/>)
    }
  }
}

export default App
