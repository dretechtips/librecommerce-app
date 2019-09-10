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
class Range extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement("div", { className: "row" },
            react_1.default.createElement("div", { className: "form-group col-6" },
                react_1.default.createElement("input", { type: "text", className: "form-control form-control-sm w-100", placeholder: this.props.prepend + " MIN" })),
            react_1.default.createElement("div", { className: "form-group col-6" },
                react_1.default.createElement("input", { type: "text", className: "form-control form-control-sm w-100", placeholder: this.props.prepend + " MAX" }))));
    }
}
exports.Range = Range;
exports.default = Range;
//# sourceMappingURL=Range.js.map