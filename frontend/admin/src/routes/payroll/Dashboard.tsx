import { DashboardProps } from "../../interface/Dashboard.interface";

const Dashboard: DashboardProps = {
  title: "Payroll",
  basePath: "/payroll",
  icons: [
    { name: "View Overview", icon: "fas fa-users", path: "/overview" },
    { name: "Release payment", icon: "fas fa-money-bill", path: "/pay" },
    { name: "Payslip", icon: "fas fa-money", path: "/payslip" }
  ]
};

export default Dashboard;
