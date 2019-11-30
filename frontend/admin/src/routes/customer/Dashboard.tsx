import { DashboardProps } from "../../interface/Dashboard.interface";

const Dashboard: DashboardProps = {
  title: "Customer",
  basePath: "/customer",
  icons: [
    {
      name: "View Current Session",
      icon: "fas fa-address-book",
      path: "/session"
    },
    { name: "Manage Accounts", icon: "fas fa-users", path: "/account" },
    {
      name: "Email Password",
      icon: "fas fa-key",
      path: "/communicate/password"
    },
    {
      name: "Communication",
      icon: "fas fa-envelope-square",
      path: "/communicate"
    }
  ]
};

export default Dashboard;
