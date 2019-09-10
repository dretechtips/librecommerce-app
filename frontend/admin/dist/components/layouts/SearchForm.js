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
const Range_1 = require("./Range");
class SearchForm extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "row" }, this.props.input.filter(cur => cur.type === "text" || cur.type === "number" || cur.type === "range").map(cur => (react_1.default.createElement("div", { className: "col-md-6" },
                react_1.default.createElement("label", { htmlFor: "" }, cur.label),
                cur.type === "range" &&
                    react_1.default.createElement(Range_1.Range, { min: 0, max: 100, prepend: "$" }),
                react_1.default.createElement("input", { className: "form-control", type: cur.type, name: "", id: "" }))))),
            react_1.default.createElement("div", { className: "row" }, this.props.input.filter(cur => cur.type === "checkbox").map(cur => (react_1.default.createElement("div", { className: "col-md-6" },
                react_1.default.createElement("label", { htmlFor: "" }, cur.label),
                react_1.default.createElement("input", { type: "checkbox", name: "", id: "" }))))),
            react_1.default.createElement("div", { className: "row" },
                react_1.default.createElement("div", { className: "col-12 text-center" },
                    react_1.default.createElement("button", { className: "btn btn-primary" }, "Submit")))));
    }
}
exports.SearchForm = SearchForm;
exports.default = SearchForm;
//# sourceMappingURL=SearchForm.js.map