import React from "react";
import { MainPanelProps } from "../interface/MainPanel.interface";
import { Switch, Route } from "react-router-dom";
import "./css/MainPanel.css";
import SidePanel from "../containers/SidePanel";
import { SidePanelContext } from "../interface/SidePanel.interface";

export default (props: MainPanelProps) => {
  function getMarginLeft(): number {
    if (
      props.browser === "mobile" ||
      props.screen === "md" ||
      props.screen === "sm" ||
      props.screen === "xs"
    )
      return 0;
    else return props.marginLeft ? props.marginLeft : 0;
  }
  return (
    <main
      style={{
        marginTop: props.marginTop ? props.marginTop : 0,
        marginLeft: getMarginLeft()
      }}
      className="p-4 main-view"
    >
      <Switch>
        {props.routes.map(cur => (
          <Route exact path={cur.path} component={cur.component} />
        ))}
      </Switch>
    </main>
  );
};
