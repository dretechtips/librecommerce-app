import { DashboardProps } from "../../interface/Dashboard.interface";

const Dashboard: DashboardProps = {
  title: "Inventory",
  basePath: "/inventory",
  icons: [
    { name: "Manage Products", icon: "fas fa-shopping-bag", path: "/product" },
    {
      name: "Manage Product Variations",
      icon: "fas fa-dice",
      path: "/product/variation"
    },
    { name: "Manage Category", icon: "fas fa-list", path: "/category" }
  ]
};

export default Dashboard;
