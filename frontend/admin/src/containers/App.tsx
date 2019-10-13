import React, { Component, ReactNode } from 'react';
import "./css/App.css";
import { AppState, AppProps } from "../interface/App.interface";
import Login from "../containers/Login";
import { BrowserRouter, withRouter } from 'react-router-dom';

export class App extends Component<AppProps, AppState> {
  static defaultState: AppState = {
    login: false,
    profile: {
      username: "{%DEFAULT%}",
      name: "{%DEFAULT%}",
      imageURL: "https://via.placeholder.com/40x40"
    }
  }
  static contextType = React.createContext<AppState>(App.defaultState);
  constructor(props: AppProps)
  {
    super(props);
    this.state = App.defaultState;
    App.contextType = React.createContext(this.state);
  }
  public login = (): void =>
  {
    // Set Username
    this.setState({...this.state, login: true, profile: {username: "johndoe1", name: "John Doe", imageURL: this.state.profile.imageURL}});
  }
  componentDidUpdate() {
    App.contextType = React.createContext(this.state);
  }
  render() {
    if(this.state.login)
    {
      return(
        <BrowserRouter>
          <div className="App">
            {this.props.children}
          </div>
        </BrowserRouter>
      );
    }
    else
    {
      return (
        <Login
          loginApp={this.login}
          logoURL={this.props.logoURL}
          />
      )
    }
  }
}

export default App;
