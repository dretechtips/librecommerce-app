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
class Login extends react_1.Component {
    render() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("section", { className: "m-5 p-5" },
                react_1.default.createElement("div", { className: "container" },
                    react_1.default.createElement("div", { className: "row justify-content-center" },
                        react_1.default.createElement("div", { className: "col-md-5" },
                            react_1.default.createElement("div", { className: "card px-5 py-3" },
                                react_1.default.createElement("div", { className: "card-body text-center" },
                                    react_1.default.createElement("img", { src: "", alt: "", className: "mb-3" }),
                                    react_1.default.createElement("h4", null, "Admin Login"),
                                    react_1.default.createElement("div", { className: "form-group" },
                                        react_1.default.createElement("div", { className: "input-group" },
                                            react_1.default.createElement("div", { className: "input-group-prepend" },
                                                react_1.default.createElement("span", { className: "input-group-text" },
                                                    react_1.default.createElement("i", { className: "fas fa-user" }))),
                                            react_1.default.createElement("input", { type: "text", className: "form-control", placeholder: "Username" }))),
                                    react_1.default.createElement("div", { className: "form-group" },
                                        react_1.default.createElement("div", { className: "input-group" },
                                            react_1.default.createElement("div", { className: "input-group-prepend" },
                                                react_1.default.createElement("span", { className: "input-group-text" },
                                                    react_1.default.createElement("i", { className: "fas fa-user" }))),
                                            react_1.default.createElement("input", { type: "text", className: "form-control", placeholder: "Password" }))),
                                    react_1.default.createElement("div", { className: "d-flex justify-content-between mb-3" },
                                        react_1.default.createElement("div", { className: "custom-control custom-checkbox" },
                                            react_1.default.createElement("input", { type: "checkbox", className: "custom-control-input" }),
                                            react_1.default.createElement("label", { htmlFor: "", className: "customer-control-label" }, "Keep Me Login")),
                                        react_1.default.createElement("a", { href: "#" }, "Forgot Password")),
                                    react_1.default.createElement("p", { className: "small text-secondary" }, "By clicking the login button you are accepting Ruff Tiger Admin Policies and Terms of Use"),
                                    react_1.default.createElement("input", { type: "submit", className: "btn btn-primary btn-block mt-3", onClick: () => this.props.login() })))))))));
    }
}
exports.Login = Login;
exports.default = Login;
//# sourceMappingURL=Login.js.map