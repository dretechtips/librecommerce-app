import React, { Component, ReactNode } from 'react'
import { AppState, AppProps } from "./interface/App.interface";
import { Nav } from "./components/layouts/Nav";
import { Sidebar } from "./components/layouts/Sidebar";
import { SidebarItem } from './interface/Sidebar.interface';
import { Main } from "./components/Main";
import { Login } from "./components/user/Login";
import Returnbar from './components/layouts/Returnbar';

export class App extends Component<AppProps, AppState> {
  private _sidebarItems: SidebarItem[] = [
    {name: "Dashboard", icon: "fas fa-tachometer-alt"},
    {name: "Billing", icon: "fas fa-money-check"},
    {name: "Cart", icon: "fas fa-shopping-cart"},
    {name: "Coupon", icon: "fas fa-percent"},
    {name: "Inventory", icon: "fas fa-warehouse"},
    {name: "Order", icon: "fas fa-receipt"},
    {name: "Promotion", icon: "fas fa-ad"},
    {name: "Shipping", icon: "fas fa-truck"},
    {name: "Spy", icon: "fas fa-user-secret"},
    {name: "User", icon: "fas fa-user"},];
  constructor(props: any)
  {
    super(props);
    this.state = {
      route: "dashboard",
      hasLogin: false
    }
  }
  public updateMainRoute = (route: string): void =>
  {
    this.setState({...this.state, route: route});
  }
  public login = (): void =>
  {
    this.setState({...this.state, hasLogin: true});
  }
  render() {
    if(this.state.hasLogin)
    {
      return(
        <React.Fragment>
          <Nav />
          <div className="row no-gutters h-100">
            <div className="col-md-2 border-right border-secondary">
              <Sidebar items={this._sidebarItems} reroute={this.updateMainRoute}/>
            </div>
            <div className="col-md-10">
              <div className="p-4">
                <Main route={this.state.route}/>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    else
    {
      return (<div>
        <Login login={this.login}/>
      </div>)
    }
  }
}

export default App
