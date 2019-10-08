import { DashboardProps } from "../../interface/routes/Dashboard.interface";

export const InventoryDashboardProps: DashboardProps = {
  title: "Inventory",
  basePath: "/inventory",
  icons: [{name: "Manage Products", icon: "fas fa-shopping-bag", path:"/product"},
    {name: "Manage Category", icon: "fas fa-list", path:"/category"}]
}