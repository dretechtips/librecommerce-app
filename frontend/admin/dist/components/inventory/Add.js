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
const Form_1 = require("../layouts/Form");
class Add extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "container" },
                react_1.default.createElement("div", { className: "row" },
                    react_1.default.createElement("div", { className: "col-12" },
                        react_1.default.createElement("div", { className: "card" },
                            react_1.default.createElement("div", { className: "card-body" },
                                react_1.default.createElement("div", { className: "row" },
                                    react_1.default.createElement("div", { className: "col-12" },
                                        react_1.default.createElement("h4", null, "Product Detail"))),
                                react_1.default.createElement("div", { className: "row" },
                                    react_1.default.createElement("div", { className: "col-md-6" },
                                        react_1.default.createElement(Form_1.Form, { questions: this.props.questions, modifier: "write" }))))))))));
    }
}
exports.Add = Add;
exports.default = Add;
//# sourceMappingURL=Add.js.map