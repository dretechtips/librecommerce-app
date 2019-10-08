import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Dashboard from './Dashboard';
import './css/MainPanel.css';
import { InventoryDashboardProps } from "../routes/inventory/Dashboard";
import { OrderDashboardProps } from "../routes/order/Dashboard";
import { BillingDashboardProps } from "../routes/billing/Dashboard"; 
import { PromoDashboardProps } from "../routes/promo/Dashboard";
import { PayrollDashboardProps } from "../routes/payroll/Dashboard";
import { ScheduleDashboardProps } from "../routes/schedule/Dashboard";
import { ShippingDashboardProps  } from "../routes/shipping/Dashboard";
import { SubscriptionDashboardProps } from "../routes/subscription/Dashboard";
import { SpyDashboardProps } from "../routes/spy/Dashboard";

export class MainPanel extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <main className="col-md-10 p-4 main-view">
            <Route extact path="/">
              <Dashboard  actions={[InventoryDashboardProps, OrderDashboardProps, BillingDashboardProps, PromoDashboardProps, PayrollDashboardProps, ScheduleDashboardProps,
              ShippingDashboardProps, SubscriptionDashboardProps, SpyDashboardProps]}/>
            </Route>
            <Route exact path="/user"></Route>
            <Route exact path="/inventory"></Route>
            <Route exact path="/order"></Route>
            <Route exact path="/customer"></Route>
            <Route exact path="/billing"></Route>
            <Route exact path="/coupon"></Route>
            <Route exact path="/promo"></Route>
            <Route exact path="/payroll"></Route>
            <Route exact path="/spy"></Route>
            <Route exact path="/cart"></Route>
            <Route exact path="/schedule"></Route>
            <Route exact path="/shipping"></Route>
            <Route exact path="/speech-filter"></Route>
            <Route exact path="/subscription"></Route>
          </main>
          </Switch>
        </BrowserRouter>
    )
  }
}

export default MainPanel
