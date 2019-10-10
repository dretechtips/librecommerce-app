import React from "react";
import App from "../containers/App";
import { SidePanelItem } from "../interface/SidePanel.interface";
import { Nav } from "../components/Nav";
import SidePanel from "./SidePanel";
import MainPanel from "./MainPanel";
import Profile from "../containers/Profile";
import { DropdownProps } from "../interface/Dropdown.interface";
import Dropdown from "../components/Dropdown";
import { BrowserRouter } from "react-router-dom";

export default () => {
  const logoURL: string = "https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Medicine_Hat_Tigers_Logo.svg/1200px-Medicine_Hat_Tigers_Logo.svg.png";
  const dropdown: DropdownProps = {
    element: <Profile />,
    items: [{name: "Test", icon: "fas fa-search", path: "/path"}]
  }
  return(
    <App logoURL={logoURL}>
      <Nav
          logoURL={logoURL}
          rightItems={[<Dropdown {...dropdown}/>]}/>
      <div className="row no-gutters App-Content">
        <SidePanel />
        <MainPanel />
      </div>
    </App>
  )
}