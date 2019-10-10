import { DashboardProps } from "../../interface/Dashboard.interface";

const Dashboard: DashboardProps = {
  title: "Speech Filter",
  basePath: "/speech-filter",
  icons: [{ name: "Manage Filter", icon: "fas fa-cogs", path: "/modify" },
    { name: "Apply Filter", icon: "fas fa-check-circle", path: "/apply" }]
}

export default Dashboard;