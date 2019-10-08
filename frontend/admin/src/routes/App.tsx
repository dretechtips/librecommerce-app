import React from "react";
import App from "../containers/App";
import { SidePanelItem } from "../interface/SidePanel.interface";
import { Nav } from "../components/Nav";
import SidePanel from "../containers/SidePanel";
import MainPanel from "../containers/MainPanel";

export default () => {
    const sidePanelItems: SidePanelItem[] = 
    [   {name: "Dashboard", icon: "fas fa-tachometer-alt"},
        {name: "Ban", icon: "fas fa-hammer"},
        {name: "Billing", icon: "fas fa-money-check"},
        {name: "Cart", icon: "fas fa-shopping-cart"},
        {name: "Customer", icon: "fas fa-shopping-bag"},
        {name: "Inventory", icon: "fas fa-warehouse"},
        {name: "Order", icon: "fas fa-receipt"},
        {name: "Payroll", icon: "fas fa-redo"},
        {name: "Promotion", icon: "fas fa-ad"},
        {name: "Shipping", icon: "fas fa-truck"},
        {name: "Speech Filter", icon: "fas fa-filter"},
        {name: "Subscription", icon: "fas fa-hand-pointer"},
        {name: "Spy", icon: "fas fa-user-secret"},
        {name: "User", icon: "fas fa-user"} ];
    return(
        <App>
            <Nav logoURL="https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Medicine_Hat_Tigers_Logo.svg/1200px-Medicine_Hat_Tigers_Logo.svg.png"
                adminURL="https://via.placeholder.com/40x40"
                adminName="John Doe"/>
            <div className="row no-gutters App-Content">
                <SidePanel items={sidePanelItems}/>
                <MainPanel />
            </div>
        </App>
    )
}