import { DashboardProps } from "../../interface/Dashboard.interface";

const Dashboard: DashboardProps = {
  title: "Subscription",
  basePath: "/subscription",
  icons: [
    {
      name: "Manage Bundles",
      icon: "fas fa-mouse-pointer",
      path: "/archive/"
    }
  ]
};

export default Dashboard;
