import { DashboardProps } from "../../interface/Dashboard.interface";

const Dashboard: DashboardProps = {
  title: "Cart",
  basePath: "/cart",
  icons: [
    { name: "View Current Session", icon: "fas fa-address-book", path: "/session" }
  ]
}

export default Dashboard;