import { DashboardProps } from "../../interface/Dashboard.interface";

const Dashboard: DashboardProps = {
  title: "User",
  basePath: "/user",
  icons: [
    { name: "Manage Account", icon: "fas fa-user", path: "/account" },
    { name: "View Active Account", icon: "fas fa-chart-line", path: "/active" },
    {
      name: "Communication",
      icon: "fas fa-envelope-square",
      path: "/communicate"
    }
    //{ name: "Manage Human Resource", icon: "fas fa-users", path: "/resource"}
  ]
};

export default Dashboard;
