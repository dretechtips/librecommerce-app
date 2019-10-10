import React, { Component } from 'react';
import ProfileUI from "../components/Profile";

export class Profile extends Component {
  componentDidMount() {
    this.setState({});
  }
  render() {
    return (
      ProfileUI(undefined)
    )
  }
}

export default Profile
