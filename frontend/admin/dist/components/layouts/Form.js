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
class Form extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement(react_1.default.Fragment, null, this.props.questions.map(cur => {
            if (cur.type === "input") {
                return (react_1.default.createElement("div", { className: "form-group" },
                    react_1.default.createElement("label", { htmlFor: "" }, cur.label),
                    react_1.default.createElement("input", { className: "form-control", type: cur.type !== undefined ? cur.type : "text" })));
            }
            else if (cur.type === "select") {
                return (react_1.default.createElement("div", { className: "form-group" },
                    react_1.default.createElement("label", { htmlFor: "" }, cur.label),
                    react_1.default.createElement("select", { name: "", id: "" }, cur.options !== undefined ? cur.options.map(cur => (react_1.default.createElement("option", null, cur))) : (react_1.default.createElement("option", null, "NO_VALUE")))));
            }
            else if (cur.type === "textarea") {
                return (react_1.default.createElement("div", { className: "form-group" },
                    react_1.default.createElement("label", { htmlFor: "" }, cur.label),
                    react_1.default.createElement("textarea", { className: "form-control", name: "", id: "", cols: 30, rows: 10 })));
            }
            else if (cur.type === "checkbox") {
                react_1.default.createElement("div", { className: "custom-control custom-checkbox" },
                    react_1.default.createElement("label", { htmlFor: "", className: "custom-control-label active" }, "Active"),
                    react_1.default.createElement("input", { type: "checkbox", className: "custom-control-input" }));
            }
        })));
    }
}
exports.Form = Form;
exports.default = Form;
//# sourceMappingURL=Form.js.map