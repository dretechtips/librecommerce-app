"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Nav_1 = require("./components/layouts/Nav");
const Sidebar_1 = require("./components/layouts/Sidebar");
const Main_1 = require("./components/Main");
const Login_1 = require("./components/user/Login");
class App extends react_1.Component {
    constructor(props) {
        super(props);
        this._sidebarItems = [
            { name: "Dashboard", icon: "fas fa-chevron-right" },
            { name: "Billing", icon: "fas fa-money-check" },
            { name: "Cart", icon: "fas fa-shopping-cart" },
            { name: "Coupon", icon: "fas fa-percent" },
            { name: "Inventory", icon: "fas fa-warehouse" },
            { name: "Orders", icon: "fas fa-receipt" },
            { name: "Spy", icon: "fas fa-ssecret" },
            { name: "User", icon: "fas fa-user" },
        ];
        this.state = {
            route: "dashboard",
            hasLogin: false
        };
    }
    updateMainRoute(route) {
        this.setState(Object.assign(Object.assign({}, this.state), { route: route }));
    }
    login() {
        this.setState(Object.assign(Object.assign({}, this.state), { hasLogin: true }));
    }
    render() {
        if (this.state.hasLogin) {
            return (react_1.default.createElement("div", null,
                react_1.default.createElement(Nav_1.Nav, null),
                react_1.default.createElement("div", { className: "row no-gutters h-100" },
                    react_1.default.createElement("div", { className: "col-md-2 border-right border-secondary" },
                        react_1.default.createElement(Sidebar_1.Sidebar, { items: this._sidebarItems, reroute: this.updateMainRoute })),
                    react_1.default.createElement("div", { className: "col-md-10" },
                        react_1.default.createElement(Main_1.Main, { route: this.state.route })))));
        }
        else {
            react_1.default.createElement("div", null,
                react_1.default.createElement(Login_1.Login, { login: this.login }));
        }
    }
}
exports.App = App;
exports.default = App;
//# sourceMappingURL=App.js.map