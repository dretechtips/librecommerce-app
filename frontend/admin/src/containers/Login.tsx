import React, { Component } from "react";
import LoginUI from "../components/Login";
import { LoginProps, LoginState } from "../interface/Login.interface";

export class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      failed: false
    }
  }
  login = (username: string, password: string) => {
    // Make Http Request to Server
    this.props.loginApp();
  }
  render() {
    if (this.state.failed) {
      return <LoginUI logoURL={this.props.logoURL} login={this.login} failed={true} />
    }
    else {
      return (<LoginUI logoURL={this.props.logoURL} login={this.login} failed={false} />)
    }
  }
}

export default Login;