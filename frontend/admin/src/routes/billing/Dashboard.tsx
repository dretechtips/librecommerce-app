import { DashboardProps } from "../../interface/routes/Dashboard.interface";

export const BillingDashboardProps: DashboardProps = {
  title: "Billing",
  basePath: "/billing",
  icons: [{name: "View Today", icon: "fas fa-calendar-day", path:"/today"},
    {name: "Search Archive", icon: "fas fa-archive", path: "/archive"}]
}