import React, { Component } from "react";
import "./css/App.css";
import { AppState, AppProps } from "../interface/App.interface";
import Login from "../containers/Login";
import { BrowserRouter } from "react-router-dom";
import getScreenType from "../utils/ScreenToSize";

export class App extends Component<AppProps, AppState> {
  static defaultState: AppState = {
    login: false,
    profile: {
      username: "Loading...",
      name: "Loading...",
      imageURL: "https://via.placeholder.com/40x40"
    },
    actions: {},
    logoURL: "localhost"
  };
  public static contextType = React.createContext<AppState>(App.defaultState);
  public constructor(props: AppProps) {
    super(props);
    this.state = {
      ...App.defaultState,
      logoURL: this.props.logoURL
    };
    App.contextType = React.createContext(this.state);
  }
  public login = (): void => {
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
