import { DashboardProps } from "../../interface/Dashboard.interface";

const Dashboard: DashboardProps = {
  title: "Promotion",
  basePath: "/promotion",
  icons: [{name: "Manage Coupon", icon: "fas fa-tag", path: "/coupon"},
    {name: "Manage Code", icon: "fas fa-code", path: "/code"}]
}

export default Dashboard;