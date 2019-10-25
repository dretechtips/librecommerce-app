import React from "react";
import { MainPanelProps } from "../interface/MainPanel.interface";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./css/MainPanel.css";

export default (props: MainPanelProps) => {
  return (
    <main className="col-md-9 col-lg-10 p-4 main-view">
      <Switch>
        {props.routes.map(cur => (
          <Route exact path={cur.path} component={cur.component} />
        ))}
      </Switch>
    </main>
  );
}