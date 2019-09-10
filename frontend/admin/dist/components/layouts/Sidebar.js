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
class Sidebar extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement("nav", null,
            react_1.default.createElement("ul", { className: "nav flex-column" }, this.props.items.map(cur => {
                return (react_1.default.createElement("li", { className: "nav-item", onClick: () => this.props.reroute(cur.name.toLowerCase()) },
                    react_1.default.createElement("span", { className: "nav-link d-flex justify-content-between text-muted align-items-center" },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("i", { className: cur.icon + " fa-fw" }),
                            cur.name),
                        react_1.default.createElement("i", { className: "fas fa-fw fa-chevron-right" }))));
            }))));
    }
}
exports.Sidebar = Sidebar;
exports.default = Sidebar;
//# sourceMappingURL=Sidebar.js.map