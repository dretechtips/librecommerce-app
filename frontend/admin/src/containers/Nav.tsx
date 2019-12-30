import React, { Component } from "react";
import { NavProps } from "../interface/Nav.interface";
import NavUI from "../components/Nav";

export class Nav extends Component<NavProps> {
  public static getHeight = (browser: "mobile" | "desktop") => {
    switch (browser) {
      case "mobile":
        return 56;
      case "desktop":
        return 56;
    }
  };
  render() {
    return <NavUI {...this.props} />;
  }
}

export default Nav;
