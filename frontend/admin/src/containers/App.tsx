import React, { Component, ReactNode } from 'react';
import "./css/App.css";
import { AppState, AppProps } from "../interface/App.interface";
import { Nav } from "../components/Nav";
import { SidePanel } from "../containers/SidePanel";
import { SidePanelItem } from '../interface/SidePanel.interface';
import { MainPanel } from "../containers/MainPanel";
import { Login } from "../routes/user/Login";

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps)
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
          {this.props.children}
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
