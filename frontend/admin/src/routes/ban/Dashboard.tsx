import { DashboardProps } from "../../interface/Dashboard.interface";

const Dashboard: DashboardProps = {
  title: "Ban",
  basePath: "/ban",
  icons: [{ name: "Manage Bans", icon: "fas fa-shoe-prints", path: "/" },
    {name: "Manage Bans Appeal", icon: "fas fa-hammer", path: "/appeal"}]
}

export default Dashboard;