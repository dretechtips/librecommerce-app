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
class Actions extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement("div", { className: "row" }, this.props.items.map(cur => (react_1.default.createElement("div", { className: "col-md-3" },
            react_1.default.createElement("div", { className: "card" },
                react_1.default.createElement("div", { className: "card-body text-center", onClick: () => cur.component.setState(Object.assign(Object.assign({}, cur.component.state), { route: cur.route })) },
                    react_1.default.createElement("i", { className: cur.icon + " fa-6x fa-fw" }),
                    react_1.default.createElement("h4", null, cur.name))))))));
    }
}
exports.Actions = Actions;
exports.default = Actions;
//# sourceMappingURL=Actions.js.map