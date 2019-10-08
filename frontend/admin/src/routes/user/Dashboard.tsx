import { DashboardProps } from "../../interface/routes/Dashboard.interface";

export const UserDashboardProps: DashboardProps = {
    title: "User",
    basePath: "/user",
    icons: [{name: "Manage Account", icon: "fas fa-user", path: "/account"},
        {name: "Reset Password", icon: "fas fa-key", path: "/reset"},
        {name: "View Active Account", icon: "fas fa-chart-line", path: "/active"}]
}