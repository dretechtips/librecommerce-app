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
const Billing_1 = require("./billing/Billing");
const Cart_1 = require("./cart/Cart");
const Coupon_1 = require("./coupon/Coupon");
const Customer_1 = require("./customer/Customer");
const Inventory_1 = require("./inventory/Inventory");
const Order_1 = require("./order/Order");
const Promo_1 = require("./promotion/Promo");
const Spy_1 = require("./spy/Spy");
const Dashboard_1 = require("./dashboard/Dashboard");
const User_1 = require("./user/User");
class Main extends react_1.Component {
    constructor(props) {
        super(props);
    }
    router(route) {
        this.setState({ route: route });
    }
    render() {
        switch (this.state.route) {
            case "dashboard":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Dashboard_1.Dashboard, null)));
            case "billing":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Billing_1.Billing, null)));
            case "cart":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Cart_1.Cart, null)));
            case "coupon":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Coupon_1.Coupon, null)));
            case "customer":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Customer_1.Customer, null)));
            case "inventory":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Inventory_1.Inventory, null)));
            case "order":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Order_1.Order, null)));
            case "promo":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Promo_1.Promo, null)));
            case "spy":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Spy_1.Spy, null)));
            case "user":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(User_1.User, null)));
        }
    }
}
exports.Main = Main;
exports.default = Main;
//# sourceMappingURL=Main.js.map