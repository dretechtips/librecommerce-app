import React, { Component, ReactNode } from "react";
import "./css/App.css";
import { AppState, AppProps } from "../interface/App.interface";
import Login from "../containers/Login";
import { BrowserRouter, withRouter } from "react-router-dom";

export class App extends Component<AppProps, AppState> {
  static defaultState: AppState = {
    login: false,
    profile: {
      username: "{%DEFAULT%}",
      name: "{%DEFAULT%}",
      imageURL: "https://via.placeholder.com/40x40"
    },
    sidePanel: false,
    actions: {
      toggleSidePanel: () => alert("Side Panel has not been set up properly!")
    },
    logoURL: "localhost"
  };
  static contextType = React.createContext<AppState>(App.defaultState);
  constructor(props: AppProps) {
    super(props);
    this.state = {
      ...App.defaultState,
      actions: {
        toggleSidePanel: this.toggleSidePanel
      },
      logoURL: this.props.logoURL
    };
    App.contextType = React.createContext(this.state);
  }
  login = (): void => {
    const nextState: AppState = {
      ...this.state,
      login: true,
      profile: {
        username: "johndoe1",
        name: "John Doe",
        imageURL: this.state.profile.imageURL
      }
    };
    this.setState(nextState);
    App.contextType = React.createContext(nextState);
  };
  toggleSidePanel = (): void => {
    const nextState: AppState = {
      ...this.state,
      sidePanel: !this.state.sidePanel
    };
    this.setState(nextState);
    App.contextType = React.createContext(nextState);
  };
  render() {
    if (this.state.login) {
      return (
        <BrowserRouter>
          <div className="App">{this.props.children}</div>
        </BrowserRouter>
      );
    } else {
      return <Login loginApp={this.login} logoURL={this.props.logoURL} />;
    }
  }
}

export default App;
